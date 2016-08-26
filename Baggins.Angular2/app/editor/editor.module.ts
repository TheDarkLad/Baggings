import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, provideForms, disableDeprecatedForms } from '@angular/forms';

import { EditorComponent }  from './editor.component';

@NgModule({
    imports: [BrowserModule, FormsModule],
    declarations: [EditorComponent],
    bootstrap: [EditorComponent],
    providers: [disableDeprecatedForms(),provideForms()],
})
export class EditorModule { }
