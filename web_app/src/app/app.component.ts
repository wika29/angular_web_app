import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { SteckbriefComponent } from "./Components/Steckbrief/steckbrief.component";
import { EmployeeModel } from './Model/PersonModel'
import { ApiService } from './Service/API/swaggerConnection';
import { DataService } from './Service/API/data-service.service';
import { ImageCaptureService } from './Service/html2Image/image-capture.service';
import { SideNavComponent } from './Components/side-nav/side-nav.component';
import { MiniCardComponent } from './Components/mini-card/mini-card.component';

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

  captureImages(element: ElementRef) {
    const elementsToCapture: ElementRef[] = [];
    elementsToCapture.push(element)
    this.imageCaptureService.capture(elementsToCapture);

    // You can also subscribe to the capturedImages$ observable if you want to get notified when the images are captured
    // this.imageCaptureService.capturedImages$.subscribe((capturedImages) => {
    // console.log('Captured Images:', capturedImages);
    //         // Do something with the captured images
    // });
  }

  cardData = [
    { title: 'Card 1', content: 'Content 1', imageUrl: 'path/to/image1.jpg' },
    { title: 'Card 2', content: 'Content 2', imageUrl: 'path/to/image2.jpg' },
    // Add more cards as needed
  ];
  
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
          const updatePromise = this.updateSteckbrief(employee).then(()=>{
            const card = this.sideNavComponent.steckbriefComponent.card
            this.captureImages(card)     
          });
          updatePromises.push(updatePromise);
        });
        Promise.all(updatePromises).then(() => {
          console.log("All mini-cards updated.");
        });
      
      
      }); 
    }
}

