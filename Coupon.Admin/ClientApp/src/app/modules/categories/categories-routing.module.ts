import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesCreateComponent } from "./components/categories-create/categories-create.component";
import { CategoriesTreeComponent } from "./components/categories-tree/categories-tree.component";
import { CategoriesUpdateComponent } from "./components/categories-update/categories-update.component";
import { CategoriesRootComponent } from "./components/categories-root/categories-root.component";
import { CategoryResolver } from "./resolvers/category.resolver";

const routes: Routes = [
  {
    path: "",
    redirectTo: "root",
    pathMatch: "full"
  },
  {
    path: "root",
    component: CategoriesRootComponent,
    children: [
      {
        path: "",
        redirectTo: "tree",
        pathMatch: "full"
      },
      {
        path: "tree",
        component: CategoriesTreeComponent
      },
      {
        path: "update/:id",
        component: CategoriesUpdateComponent,
        outlet: "cat",
        resolve:{
          category: CategoryResolver
        }
      },
      {
        path: "create",
        component: CategoriesCreateComponent,
        outlet: "cat"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}
