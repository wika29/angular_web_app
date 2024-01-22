import {Component} from '@angular/core';
import {style} from "@angular/animations";
import { SteckbriefComponent } from "./Components/Steckbrief/steckbrief.component";
import { ApiService } from './Service/API/swaggerConnection';
import { EmployeeModel } from './Model/PersonModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web_app';
  modelEmployees: EmployeeModel[] = [];
  showOverlay: boolean = false; //boolean um den Steckbrief anzuzeigen (true für Anzeige)
  
  itemList: any[] = [
    SteckbriefComponent,
  ];
  protected readonly style = style;

  constructor(){}
  
  onButtonClick(buttonName: string) {
    console.log(`${buttonName} clicked`);
  }


  openOverlay() {
      this.showOverlay = !this.showOverlay;
  } 
  
  ngOnInit(): void {   
    let apiService = new ApiService()

   /*  apiService.getAllEmployees(true).then((data) => { 
          data.forEach(element => {
              let eModel = new EmployeeModel(element.id,
                                            element.firstName,
                                            element.lastName,
                                            element.street,
                                            element.postcode,
                                            element.city,
                                            element.phone)
              // console.log("elem: " + eModel.toString())
            this.modelEmployees.push(eModel)

          });
      }); */

    };
}

