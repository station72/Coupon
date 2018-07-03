import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsUpdateComponent } from './components/products-update/products-update.component';
import { ProductResolverService } from './resolvers/product-resolver.service';
import { ProductsGuardService } from './services/products-guard.service';

const routes: Routes = [
  {
    path:'',
    canActivate: [ProductsGuardService],
    canActivateChild: [ProductsGuardService],
    children:[
      {
        path:'',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ProductsListComponent,
      },
      {
        path: 'create',
        component: ProductsCreateComponent,
      },
      {
        path: 'update/:id',
        component: ProductsUpdateComponent,
        resolve:{
          product: ProductResolverService
        }
      }
    ]
  }

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ProductsRoutingModule { }
