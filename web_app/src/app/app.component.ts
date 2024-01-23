import {Component, ViewChild} from '@angular/core';
import {EmployeeModel} from './Model/PersonModel'
import {ApiService} from './Service/API/swaggerConnection';
import {DataService} from './Service/data-sharing/data-service.service';
import {ImageCaptureService} from './Service/html2Image/image-capture.service';
import {SideNavComponent} from './Components/side-nav/side-nav.component';
import {MiniCard} from './Components/mini-card/mini-card.component';

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

  ngAfterViewInit() {
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
          const updatePromise = Promise.resolve(this.dataService.updateSteckbrief(employee))
        updatePromises.push(updatePromise);

          Promise.all(updatePromises).then(() => {
            const card = this.sideNavComponent.steckbriefComponent.card
            const updatePromise = this.imageCaptureService.capture(card).then((data) => {
              this.dataService.addCard(this.cardData, '', data, employee);
            });
            updatePromises.push(updatePromise);
          });
        });
      // console.log(this.sideNavComponent.appSteckbriefRef.nativeElement)
      //
    });
      // this.sideNavComponent.removeClass()
    }
}

