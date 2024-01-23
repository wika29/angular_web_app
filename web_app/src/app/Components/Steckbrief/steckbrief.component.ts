import { Component, Input} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-steckbrief',
    templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css']
})
export class SteckbriefComponent {
  @Input() showOverlay: boolean = false;

  closeOverlay() {
    this.showOverlay = false;
  }
}


