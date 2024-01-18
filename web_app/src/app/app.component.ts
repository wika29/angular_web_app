import {Component} from '@angular/core';
import {style} from "@angular/animations";
import {SteckbriefComponent} from "./Components/Steckbrief/steckbrief.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemList: any[] = [
    SteckbriefComponent,
  ];
  onButtonClick(buttonName: string) {
    // Hier kannst du die Logik für die Button-Klicks hinzufügen
    console.log(`${buttonName} clicked`);
  }

  protected readonly style = style;
  title = 'web_app';
  //boolean um den Steckbrief anzuzeigen
  showOverlay: boolean = false; // turn back to false when done

  openOverlay() {
      this.showOverlay = !this.showOverlay;
  }
}
