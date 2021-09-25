import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop'; 
import { MatMenuModule } from '@angular/material/menu'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { CustomPartComponent } from './custom-part/custom-part.component';
import { PartAssemblyComponent } from './part-assembly/part-assembly.component';
import { MakeModelComponent } from './make-model/make-model.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomPartComponent,
    PartAssemblyComponent,
    MakeModelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatMenuModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSliderModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
