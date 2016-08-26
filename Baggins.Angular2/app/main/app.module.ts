import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, provideForms, disableDeprecatedForms } from '@angular/forms';

import { AppComponent }  from './app.component';

@NgModule({
    imports: [BrowserModule, FormsModule], 
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [disableDeprecatedForms(),provideForms()],
})
export class AppModule { }
