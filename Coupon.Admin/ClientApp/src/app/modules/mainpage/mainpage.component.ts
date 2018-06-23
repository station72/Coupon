import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main',
  template: `
  <div>
 
  <div><a [routerLink]="['product']"> Product </a> </div>
  <div><a [routerLink]="[{outlets:{detail:['productdetail']}}]"> Product Detail </a> </div>
  <div> <router-outlet></router-outlet></div>
  <div> <router-outlet name="detail"></router-outlet>

</div>
  `,
  encapsulation: ViewEncapsulation.None,
})

export class MainpageComponent {
  constructor(){
  }
}
  //<div> <router-outlet name="detail"></router-outlet>