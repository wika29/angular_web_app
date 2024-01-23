import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Data } from '@angular/router';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { DataService } from 'src/app/Service/data-sharing/data-service.service';

export interface MiniCard {
  title: string;
  backgroundImage: string;
  employeeModel: EmployeeModel
}

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css'],
  template: `<mat-card class="custom-card" *ngFor="let card of cardData" [style.background-image]="'url(' + card.backgroundImage + ')'" (click)="cardClicked(card)">{{ card.title }}</mat-card>`,
})
export class MiniCardComponent implements OnInit {
  @Input() cardData!: MiniCard[];
  sharedData: any;
  showOverlay: boolean = true;
  

  constructor(private sharedService: DataService, private dataService: DataService, private renderer: Renderer2) {}
  
  ngOnInit(): void {
    this.dataService.getBigCardVisibility().subscribe((value) => (this.showOverlay = value));
  }  

  private scrollTop: number = 0;
  private scrollLeft: number = 0;

  disableScroll(): void {
    // Get the current page scroll position
    this.scrollTop = document.documentElement.scrollTop;
    this.scrollLeft = document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = () => {
      window.scrollTo(this.scrollLeft, this.scrollTop);
    };
  }

  enableScroll(): void {
    window.onscroll = () => {};
  }

  cardClicked(card: any): void {
    if(this.showOverlay){
      this.disableScroll();
    }
    else{
      this.enableScroll();
    }
    // if(this.showOverlay = true){
      const miniCard = card as MiniCard;
      this.sharedService.updateData(miniCard.employeeModel)
      console.log('Clicked Card Data:', miniCard.employeeModel.firstName);
      this.sharedService.setBigCardVisibility(!this.showOverlay)   
    //  }
  }
}
