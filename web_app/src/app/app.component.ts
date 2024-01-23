import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SteckbriefComponent } from "./Components/Steckbrief/steckbrief.component";
import { EmployeeModel } from './Model/PersonModel'
import { ApiService } from './Service/API/swaggerConnection';
import { DataService } from './Service/API/data-service.service';
import { ImageCaptureService } from './Service/html2Image/image-capture.service';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { MiniCard, MiniCardComponent } from './Components/mini-card/mini-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web_app';
  modelEmployees: EmployeeModel[] = [];
  smallHtmlImages: HTMLDivElement[] = [];
  overlay: boolean = true; //boolean um den Steckbrief anzuzeigen (true für Anzeige)
  @ViewChild( SideNavComponent) sideNavComponent!: SideNavComponent;

  constructor(private apiService: ApiService, private dataService: DataService, private imageCaptureService: ImageCaptureService){}

  updateSteckbrief(employee : EmployeeModel): Promise<void> {
    return Promise.resolve(this.dataService.updateData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      id: employee.id,
      street: employee.street,
      postalCode: employee.postcode,
      city: employee.city,
      phoneNumber: employee.phone,
      // skills: employee.skillSet,
    }));

  }

  cardData: MiniCard[] = [];

  addCard(title: string, backgroundImage: string): void {
    const newCard: MiniCard = { title, backgroundImage };
    this.cardData.push(newCard);
  }

  ngAfterViewInit(){
    this.apiService.getAllEmployees().then((data) => {
      const updatePromises: Promise<void>[] = [];
      data.forEach(element => {
          const employee = new EmployeeModel(element.id,
          element.firstName,
          element.lastName,
          element.street,
          element.postcode,
          element.city,
          element.phone)
          const updatePromise = this.updateSteckbrief(employee)
          updatePromises.push(updatePromise);
        });

        Promise.all(updatePromises).then(() => {
          const card = this.sideNavComponent.steckbriefComponent.card
          this.imageCaptureService.capture(card).then((data)=>{
            this.addCard('', data);
          });
        });


      });
    }
}

