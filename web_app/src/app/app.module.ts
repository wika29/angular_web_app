// app.module.ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {SizedBoxComponent} from './Components/Button/sized-box/sized-box.component';
import {SearchFieldComponent} from './Components/Button/search-field/search-field.component';
import {SteckbriefComponent} from './Components/Steckbrief/steckbrief.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    SizedBoxComponent,
    SearchFieldComponent,
    SteckbriefComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
  ],  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
