import { Component, Input, AfterViewInit, ElementRef, ViewChild, Output, EventEmitter, AfterContentInit} from '@angular/core';
import { ApiService } from 'src/app/Service/API/swaggerConnection';
import { EmployeeModel } from 'src/app/Model/PersonModel';
import { makeImage } from 'src/app/Service/html2Image/html2canvas';
import { MatCard } from '@angular/material/card';

@Component({
  selector: 'app-steckbrief',
  templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css'],
  template: '<mat-card-content #steckbrief></mat-card-content>',
})
export class SteckbriefComponent implements AfterViewInit {
  @Input() showOverlay: boolean = true;
  @ViewChild('steckbrief', {static:false}) card!: ElementRef ;  

  ngAfterViewInit(): void {
    const element = this.card;
    // console.log("width: ", element);
    // new makeImage().capture(element);

  } 
}