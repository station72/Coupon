import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ProviderGuard } from "./shared/guards/provider.guard";

const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate:[ProviderGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' },    
  ];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}