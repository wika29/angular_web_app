import { Component, ViewChild, Renderer2, Input, ElementRef, AfterViewInit } from '@angular/core';
import { SteckbriefComponent } from '../Steckbrief/steckbrief.component';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent implements AfterViewInit {
  @Input() cardData: any;
  @ViewChild(SteckbriefComponent) steckbriefComponent!: SteckbriefComponent;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    console.log('ElementRef:', this.el);
    const divElement = this.el.nativeElement.querySelector('#steckbrief');
    console.log('DivElement:', divElement);
    this.removeClass();
  }

  removeClass() {
    const divElement = this.el.nativeElement.querySelector('#steckbrief');
    this.renderer.removeClass(divElement, 'hiddenContainer');
  }
}
