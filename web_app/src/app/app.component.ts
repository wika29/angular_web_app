import {Component} from '@angular/core';
import {style} from "@angular/animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemList: string[] = [
    "test1",
    "test2",
    "test2",
    "test2",
    "test2",
    "test2",
  ]; // Hier können deine Elemente aus der Liste eingefügt werden
  onButtonClick(buttonName: string) {
    // Hier kannst du die Logik für die Button-Klicks hinzufügen
    console.log(`${buttonName} clicked`);
  }

  protected readonly style = style;
}
