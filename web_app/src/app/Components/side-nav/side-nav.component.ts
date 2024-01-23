import { Component, ViewChild, Renderer2, Input, ElementRef, AfterViewInit } from '@angular/core';
import { SteckbriefComponent } from '../Steckbrief/steckbrief.component';
import { MiniCardComponent } from '../mini-card/mini-card.component';
import { MiniCard } from '../mini-card/mini-card.component';
import { DataService } from 'src/app/Service/data-sharing/data-service.service';
import { debounceTime, distinctUntilChanged, switchMap , Subject, Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  @Input() cardData!: MiniCard[];
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild(MiniCardComponent) miniCardComponent!: MiniCardComponent;

  searchTerm: string = '';
  searchTerm$ = new Subject<string>();
  filteredCardData: any[] = [];
  numberOfCardsSubject = new Subject<number>();

  constructor(private dataService: DataService) {
    /* this.searchTerm$
    .pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // only emit if the value is different from the previous one
      switchMap((searchTerm: string) => this.filterCardData(searchTerm))
    )
    .subscribe((searchResults: any[]) => {
      searchResults.forEach(element => {
        console.log("filter: ", element)
      });
      this.filteredCardData = searchResults;
    });
    this.numberOfCardsSubject.subscribe((newNumber: number)=> {
      
    }); */
  }


/*   filterCardData(searchTerm: string): Observable<MiniCard[]> {
    // Filter the cardData based on the searchTerm
    const filteredData = this.cardData.filter((card) =>
      card.employeeModel.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return new Observable((observer) => {
      observer.next(filteredData);
      observer.complete();
    });
  }
   */
  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }

}
