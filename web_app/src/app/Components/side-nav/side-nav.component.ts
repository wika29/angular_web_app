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
  cardData$ = new BehaviorSubject<MiniCard[]>([]);
  miniCardData$ = this.dataService.miniCardData$;
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild(MiniCardComponent) miniCardComponent!: MiniCardComponent;

  searchTerm: string = '';
  searchTerm$ = new Subject<string>();
  filteredCardData: any[] = [];
  numberOfCardsSubject = new Subject<number>();

  constructor(private dataService: DataService) {
    this.miniCardData$.subscribe((cards: MiniCard[]) => {
      this.cardData$.next(cards);
    });
  }

  onClick(){
    this.steckbriefComponent.toggleOverlay()
  }

  onSearchTermChange(term: string) {
    this.searchTerm$.next(term);
  }

}
