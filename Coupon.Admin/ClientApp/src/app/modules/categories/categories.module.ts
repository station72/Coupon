import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TreeModule } from 'angular-tree-component';
import { CategoriesRoutingModule } from "./categories-routing.module";
import { CategoriesCreateComponent } from "./components/categories-create/categories-create.component";
import { CategoriesRootComponent } from "./components/categories-root/categories-root.component";
import { CategoriesTreeComponent } from "./components/categories-tree/categories-tree.component";
import { CategoriesUpdateComponent } from "./components/categories-update/categories-update.component";
import { CategoriesService } from "./services/categories.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoriesFormFactory } from "./services/categories-form-factory";
import { SharedModule } from "../shared/shared.module";
import { CategoriesTreeService } from "./services/categories-tree.service";
import { ContextMenuModule } from "ngx-contextmenu";
import { CategoryResolver } from "./resolvers/category.resolver";

@NgModule({
  imports: [
    CommonModule,
    TreeModule,
    CategoriesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ContextMenuModule
  ],
  declarations: [
    CategoriesRootComponent,
    CategoriesTreeComponent,
    CategoriesUpdateComponent,
    CategoriesCreateComponent,
  ],
  providers:[
    CategoriesService,
    CategoriesFormFactory,
    CategoriesTreeService,
    CategoryResolver
  ]
})
export class CategoriesModule {}


