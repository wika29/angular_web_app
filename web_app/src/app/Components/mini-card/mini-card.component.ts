import { Component, Input, OnInit } from '@angular/core';
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
  

  constructor(private sharedService: DataService, private dataService: DataService) {}
  
  ngOnInit(): void {
    this.dataService.getBigCardVisibility().subscribe((value) => (
      this.showOverlay = value
    ));
  }  

  cardClicked(card: any): void {
      console.log(typeof card)
      this.sharedService.setBigCardVisibility(!this.showOverlay)    
  }
}
