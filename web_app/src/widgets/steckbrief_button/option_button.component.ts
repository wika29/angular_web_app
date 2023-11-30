import { Component } from '@angular/core';

@Component({
  selector: 'app-test-button',
  template: '<button (click)="printTest()">Click me</button>',
})
export class OptionButton {
  printTest(): void {
    console.log('Test');
  }
}
