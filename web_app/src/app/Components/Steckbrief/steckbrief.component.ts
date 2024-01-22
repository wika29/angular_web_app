import { Component, Input} from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-steckbrief',
    templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css']
})
export class SteckbriefComponent {
  @Input() showOverlay: boolean = false;
}


