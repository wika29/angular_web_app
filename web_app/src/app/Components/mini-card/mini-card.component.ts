import { Component, Input, OnInit } from '@angular/core';
import { Data } from '@angular/router';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { DataSharingService } from 'src/app/Service/data-sharing/data-sharing.service';

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
  showOverlay: boolean = false;
  

  constructor(private sharedService: DataSharingService, private dataSharingService: DataSharingService) {}
  
  ngOnInit(): void {
    this.dataSharingService.getBigCardVisibility().subscribe((value) => (this.showOverlay = value));
  }  

  cardClicked(card: any): void {
      let bool = !this.showOverlay;
      console.log("Card was clicked! bool is: ", bool)
      this.sharedService.setBigCardVisibility(bool)    
  }
}
