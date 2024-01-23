import { Component, ViewChild, Input} from '@angular/core';
import { SteckbriefComponent } from '../Steckbrief/steckbrief.component';
import { MiniCardComponent } from '../mini-card/mini-card.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  template: `<app-mini-card *ngFor="let card of cards" [cardData]="card"></app-mini-card>`,
})
export class SideNavComponent {
  @Input() cardData: any;
  @ViewChild( SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild( MiniCardComponent) miniCardComponent!: MiniCardComponent;

  cards = [
    { title: 'Card 1', content: 'Content 1', imageUrl: 'path/to/image1.jpg' },
    { title: 'Card 2', content: 'Content 2', imageUrl: 'path/to/image2.jpg' },
    // Add more cards as needed
  ];

}
