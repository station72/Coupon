import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TreeModule } from 'angular-tree-component';
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesCreateComponent } from "./components/categories-create/categories-create.component";
import { CategoriesRootComponent } from "./components/categories-root/categories-root.component";
import { CategoriesTreeComponent } from "./components/categories-tree/categories-tree.component";
import { CategoriesUpdateComponent } from "./components/categories-update/categories-update.component";
import { CategoriesService } from "./services/categories.service";

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    CategoriesRoutingModule
  ],
  declarations: [
    CategoriesRootComponent,
    CategoriesTreeComponent,
    CategoriesUpdateComponent,
    CategoriesCreateComponent,
  ],
  providers:[
    CategoriesService
  ]
})
export class CategoriesModule {}


