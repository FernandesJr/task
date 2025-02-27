import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Componets material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule
  ],
  exports: [
    MatSlideToggleModule,
    MatExpansionModule,
    MatIconModule
  ]
})
export class AppMaterialModule { }
