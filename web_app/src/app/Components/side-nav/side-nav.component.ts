import { Component, ViewChild, Renderer2, Input, ElementRef, AfterViewInit } from '@angular/core';
import { SteckbriefComponent } from '../Steckbrief/steckbrief.component';
import { MiniCardComponent } from '../mini-card/mini-card.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  @Input() cardData: any;
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;
  @ViewChild(MiniCardComponent) miniCardComponent!: MiniCardComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) {}
}
