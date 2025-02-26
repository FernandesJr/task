import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componets material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatExpansionModule
  ],
  exports: [
    MatSlideToggleModule,
    MatExpansionModule
  ]
})
export class AppMaterialModule { }
