import { Component, Input, OnInit } from '@angular/core';
import { ImageCaptureService } from 'src/app/Service/html2Image/image-capture.service';

@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.css'],
  template: `<mat-card class="custom-card" *ngFor="let card of cardData"></mat-card>`,
})
export class MiniCardComponent {
  @Input() cardData: any;
  // cards = Array.from({ length: 11 }); 
}
