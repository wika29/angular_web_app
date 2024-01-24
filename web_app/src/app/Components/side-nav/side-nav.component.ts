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
  cardData$ = new BehaviorSubject<MiniCard[]>([]);
  miniCardData$ = this.dataService.miniCardData$;
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild(MiniCardComponent) miniCardComponent!: MiniCardComponent;
  searchForm!: FormGroup;

  searchTerm: string = '';
  originalCardData: MiniCard[] = [];


  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.miniCardData$.subscribe((cards: MiniCard[]) => {
      this.originalCardData = cards;
      this.cardData$.next(cards);
    });
  }

  onClick() {
    this.steckbriefComponent.resetFields()
    this.steckbriefComponent.toggleOverlay()
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      searchTerm: [''],
    });

    this.searchForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((formValue) => {
        console.log('Form value:', formValue);

        const searchTerm = formValue.searchTerm.toLowerCase();

        let filteredData = searchTerm
        if (searchTerm) {
          filteredData = this.cardData$.value.filter((card) =>
            card.employeeModel.firstName.toLowerCase().includes(searchTerm)
          );
          this.dataService.updateCards(filteredData);
        } else {
          // this.dataService.resetMiniCards();
        }

        // console.log('Filtered data:', filteredData);


        return of(filteredData);
      })
    ).subscribe();
  }

}
