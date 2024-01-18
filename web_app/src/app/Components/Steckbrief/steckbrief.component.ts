import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-steckbrief',
    templateUrl: './steckbrief.component.html',
  styleUrls: ['./steckbrief.component.css']
})
export class SteckbriefComponent {
  @Input() showOverlay: boolean = false;
}


