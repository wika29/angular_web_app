import {Component, ViewChild} from '@angular/core';
import {SteckbriefComponent} from '../Steckbrief/steckbrief.component';
import {MiniCard, MiniCardComponent} from '../mini-card/mini-card.component';
import {DataService} from 'src/app/Service/data-sharing/data-service.service';
import {BehaviorSubject, debounceTime, distinctUntilChanged, of, switchMap} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})

export class SideNavComponent {
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild(MiniCardComponent) miniCardComponent!: MiniCardComponent;
  
  searchForm!: FormGroup;
  searchTerm: string = '';
  
  cardData$ = new BehaviorSubject<MiniCard[]>([]);
  filteredCards$ = new BehaviorSubject<MiniCard[]>([]);
  cardDataObserver$ = this.dataService.cardDataObserver$;
  filteredCardObserver$ = this.dataService.filterdCardsObserver$;

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.cardDataObserver$.subscribe((cards: MiniCard[]) => {     
      this.cardData$.next(cards);
    });
    this.filteredCardObserver$.subscribe((cards: MiniCard[]) => {     
      this.filteredCards$.next(cards);
    });  
  }


  onClick() {
    this.dataService.setDeleteVisibility(true);
    this.steckbriefComponent.resetFields();
    this.steckbriefComponent.toggleOverlay();
  }


  //Suche
  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
    
    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((formValue) => {
        const searchTerm = formValue.searchTerm.toLowerCase();        
        if (searchTerm) {     
          let filteredData = this.cardData$.value.filter((card) =>
            card.employeeModel.firstName.toLowerCase().includes(searchTerm)
          );        
          this.dataService.updateFilteredCards(filteredData)
          return of(filteredData);
        } else {        
          this.dataService.updateFilteredCards(this.cardData$.value);
          return of(this.cardData$.value)
        }   
      })
    ).subscribe();
  }


}

