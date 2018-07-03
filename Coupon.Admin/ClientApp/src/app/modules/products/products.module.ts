import { NgModule } from '@angular/core';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductsCreateComponent } from './components/products-create/products-create.component';
import { ProductsUpdateComponent } from './components/products-update/products-update.component';
import { ProductsRootComponent } from './components/products-root/products-root.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsGuardService } from './services/products-guard.service';
import { ProductsService } from './services/products.service';
import { ProductsFormFactoryService } from './services/products-form-factory.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    SharedModule.forRoot(),
    ProductsRoutingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    NgbModule.forRoot()
  ],
  declarations: [
    ProductsListComponent, 
    ProductsCreateComponent, 
    ProductsUpdateComponent, 
    ProductsRootComponent
  ],
  providers:[
    ProductsGuardService,
    ProductsService,
    ProductsFormFactoryService
  ],
  exports:[
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
