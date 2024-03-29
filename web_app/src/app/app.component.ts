import { Component, ElementRef, EventEmitter, Output, ViewChild , Renderer2 } from '@angular/core';
import { EmployeeModel } from './Model/PersonModel'
import { ApiService } from './Service/API/swaggerConnection';
import { DataService } from './Service/data-sharing/data-service.service';
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
  @ViewChild( SideNavComponent) sideNavComponent!: SideNavComponent;

  constructor(private apiService: ApiService, private dataService: DataService, private imageCaptureService: ImageCaptureService){}

  cardData: MiniCard[] = [];

  ngAfterViewInit(){ 
    this.apiService.getAllEmployees().then((response) => {  
      const updatePromises: Promise<void>[] = [];   
      response.data.forEach((element: EmployeeModel) => {
          const employee = new EmployeeModel(
          element.id,
          element.lastName,
          element.firstName,
          element.street,
          element.postcode,
          element.city,
          element.phone,
          // element.skillSet
          )
          Promise.all(updatePromises).then(()=> {
              this.dataService.updateSteckbrief(employee)
          }).catch((err) => console.error("error during value assignment to card at start: " + err));
          Promise.all(updatePromises).then(() => {
            const card = this.sideNavComponent.steckbriefComponent.card
            const updatePromise = this.imageCaptureService.capture(card).then((data)=>{            
              this.dataService.addCard('', data, employee);  
            });   
            updatePromises.push(updatePromise);   
          }).catch((err) => console.error("error during rendering images: " + err));     
        });      
      });      
    }
}

