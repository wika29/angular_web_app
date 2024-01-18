import {Component} from '@angular/core';
import {style} from "@angular/animations";
import {SteckbriefComponent} from "./Components/Steckbrief/steckbrief.component";
import { ApiService } from './Service/API/swaggerConnection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  responseData: any;
  constructor(private apiService: ApiService){
    console.log("hello")
  }
  
  itemList: any[] = [
    SteckbriefComponent,
  ];
  onButtonClick(buttonName: string) {
    // logik für Button einbauen
    console.log(`${buttonName} clicked`);
  }

  protected readonly style = style;
  title = 'web_app';
  //boolean um den Steckbrief anzuzeigen
  showOverlay: boolean = false; // turn back to false when done

  openOverlay() {
      this.showOverlay = !this.showOverlay;
  } 
  
  ngOnInit(): void {
    this.apiService.getAllRequestData().subscribe(data => {
      this.responseData = data;
      if(this.responseData == null || this.responseData == undefined){
        console.error("Response data is empty!")
      }
      console.log(this.responseData)
    });
  }
}
