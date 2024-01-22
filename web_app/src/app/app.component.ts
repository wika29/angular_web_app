import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import {style} from "@angular/animations";
import { SteckbriefComponent } from "./Components/Steckbrief/steckbrief.component";
import { EmployeeModel } from './Model/PersonModel'
import { LocationStrategy } from '@angular/common';
import { makeImage } from './Service/html2Image/html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template:`<app-steckbrief></app-steckbrief>`
})
export class AppComponent {
  title = 'web_app';
  modelEmployees: EmployeeModel[] = [];
  smallHtmlImages: HTMLDivElement[] = [];
  overlay: boolean = true; //boolean um den Steckbrief anzuzeigen (true für Anzeige)
  @ViewChild( SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
 
  protected readonly style = style;

  ngAfterViewInit(){
    const element = this.steckbriefComponent.card
    /* const apiService = new ApiService()
    apiService.getAllEmployees(true).then((data) => { 
      data.forEach(element => {
        let employee = new EmployeeModel(element.id,
          element.firstName,
          element.lastName,
          element.street,
          element.postcode,
          element.city,
          element.phone)
          this.modelEmployees.push(employee)
          let image = new makeImage().capture(this.card)
          if(image != null)
          this.smallHtmlImages.push(image)
      });
    });  */ 
    
    // new makeImage().capture(element)

  }

}

