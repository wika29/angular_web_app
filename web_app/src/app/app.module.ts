import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {OptionButton} from "../widgets/steckbrief_button/option_button.component";

@NgModule({
  declarations: [
    AppComponent,
    OptionButton
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, OptionButton]
})
export class AppModule { }
