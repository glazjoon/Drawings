import { SelectedElementComponent } from './components/selected-element/selected-element.component';
import { ElementComponent } from './components/element/element.component';
import { ElementListComponent } from './components/element-list/element-list.component';
import { EditorService } from './services/editor.service';

import { EditorComponent } from './components/editor/editor.component';
import { AppComponent } from './app.component';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [BrowserModule],
  declarations: [
    AppComponent,
    EditorComponent,
    ElementComponent,
    ElementListComponent,
    SelectedElementComponent
  ],
  bootstrap: [AppComponent],
  providers: [EditorService]
})
export class AppModule { }
