import { Component, ViewChild, Renderer2, Input, ElementRef, AfterViewInit } from '@angular/core';
import { SteckbriefComponent } from '../Steckbrief/steckbrief.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  @Input() cardData: any;
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) {}
}
