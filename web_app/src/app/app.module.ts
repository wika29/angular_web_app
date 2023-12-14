import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {InitialScreenComponent} from './screens/initial_screen/initial-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    InitialScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
