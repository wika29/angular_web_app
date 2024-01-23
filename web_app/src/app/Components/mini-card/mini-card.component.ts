import { Component, Input, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/Model/PersonModel';

export interface MiniCard {
  title: string;
  backgroundImage: string;
  employeeModel: EmployeeModel
}

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css'],
  template: `<mat-card class="custom-card" *ngFor="let card of cardData" [style.background-image]="'url(' + card.backgroundImage + ')'">  {{ card.title }} </mat-card>`,
})
export class MiniCardComponent {
  @Input() cardData!: MiniCard[];
  // cards = Array.from({ length: 11 }); 
}
