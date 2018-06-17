import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-productdetail',
  template: `This is the Product Detail Page`,
  
  encapsulation: ViewEncapsulation.None,
})





export class ProductDetailComponent implements OnInit {

constructor() {
   // console.log('MainPage Constructor');
  }

  ngOnInit() {
    // console.log('Mainpage OnInit');
  }

}
