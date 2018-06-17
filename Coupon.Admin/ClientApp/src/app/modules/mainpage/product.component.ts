import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `This is the Product Page`,
  
  // encapsulation: ViewEncapsulation.None,
})





export class ProductComponent implements OnInit {

constructor() {
   // console.log('MainPage Constructor');
  }

  ngOnInit() {
    console.log('Mainpage OnInit');
  }

}
