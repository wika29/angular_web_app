import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {InitialScreenComponent} from './screens/initial_screen/initial-screen.component';
import {OptionButton} from "../widgets/steckbrief_button/option_button.component";
import { DialogComponent } from './dialog-popup/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
    declarations: [
        AppComponent,
        InitialScreenComponent,
        OptionButton,
        DialogComponent
    ],
  imports: [
    BrowserModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
