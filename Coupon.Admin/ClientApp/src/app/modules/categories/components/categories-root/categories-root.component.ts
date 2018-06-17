import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories-root',
  templateUrl: './categories-root.component.html',
  styleUrls: ['./categories-root.component.css']
})
export class CategoriesRootComponent {

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  onCreate(){
    // this.router.navigate(['create', {outlets: 'categoryaction'}], {
      this.router.navigate([{ outlets: { categoryaction: ['categories', 'create'] }}]);
  }

}
