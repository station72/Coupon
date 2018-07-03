import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProviderGuard } from "./shared/guards/provider.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[ProviderGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'providers', loadChildren: './modules/provider/providers.module#ProvidersModule'},
    { path: 'mainpage', loadChildren: './modules/mainpage/mainpage.module#MainpageModule'  },
    { path: 'categories', loadChildren: './modules/categories/categories.module#CategoriesModule'  },
    { path: 'products', loadChildren: './modules/products/products.module#ProductsModule'  },
  ];

@NgModule({
    imports:[
        RouterModule.forRoot(routes, {
            enableTracing: false,
            // errorHandler: (error: any) => console.error(error)
        })
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{
}