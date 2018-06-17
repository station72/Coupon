import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainpageComponent } from './mainpage.component';
import { MainRoutingModule } from './mainpage.routing';

import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './productdetail.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
  ],
  exports: [],
  declarations: [
    MainpageComponent, 
    ProductComponent, 
    ProductDetailComponent
  ]
})
export class MainpageModule { }