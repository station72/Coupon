import { Component, OnInit } from '@angular/core';
import { ProductDto } from '../../dto/product.dto';
import { ProductsService } from '../../services/products.service';
import { Observable, pipe } from 'rxjs';
import { ListResult } from 'src/app/shared/data/list-result.dto';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  private limit = 50;
  public products: ProductDto[];

  constructor(
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  fetchListDataCallback(){
    return this.fetchListData.bind(this);
  }

  private fetchListData(offset: number): Observable<ListResult<ProductDto>> {
    return this.productsService
      .getList({
        limit: this.limit,
        offset: offset
      }).pipe(pipe(map(res => {
        this.products = res.result;
        return res;
      })));
  }

  private onEdit(id: string) {
    this.router.navigate(['/products/edit/' + id]);
  }

  onCreate(){
    this.router.navigate(['/products/create']);
  }

}
