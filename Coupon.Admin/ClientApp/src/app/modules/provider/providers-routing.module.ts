import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";
import { ProviderCreateComponent } from "./components/provider-create/provider-create.component";
import { ProviderRootComponent } from "./components/provider-root/provider-root.component";
import { ProviderEditComponent } from "./components/provider-edit/provider-edit.component";
import { SuperAdminGuard } from "../../shared/guards/super-admin.guard";
import { ProviderEditResolver } from "./components/provider-edit/provider-edit.resolver";

const routes: Routes = [
    { 
        path: 'providers', 
        component: ProviderRootComponent,
        canActivate: [SuperAdminGuard],
        children: [
            {
                path: '', 
                component: ProviderListComponent
            },
            {
                path: 'create',
                component: ProviderCreateComponent
            },
            {
                path: 'edit:id',
                component: ProviderEditComponent,
                resolve: {
                    provider: ProviderEditResolver
                }
            }
        ]  
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports :[
        RouterModule
    ]
})
export class ProvidersRoutingModule{

}