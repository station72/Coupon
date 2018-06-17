import { ModuleWithProviders, NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainpageComponent } from "./mainpage.component";
import { ProductComponent } from "./product.component";
import { ProductDetailComponent } from "./productdetail.component";

const childroutes: Routes = [
  {
    path: "load",
    component: MainpageComponent,
    children: [
      { path: "product", component: ProductComponent },
      {
        path: "productdetail",
        component: ProductDetailComponent,
        outlet: "detail"
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(childroutes);

const newLocal: NgModule = {
  imports: [RouterModule.forChild(childroutes)],
  exports: [RouterModule],
  declarations: []
};

@NgModule(newLocal)
export class MainRoutingModule {}
