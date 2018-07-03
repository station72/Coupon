import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductDto } from '../dto/product.dto';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductResolverService implements Resolve<ProductDto> {
  constructor(
    private productsService: ProductsService
  ){
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductDto> | Promise<ProductDto> | ProductDto{
    const id = route.params['id'];
    return this.productsService.get(id);
  }
}
