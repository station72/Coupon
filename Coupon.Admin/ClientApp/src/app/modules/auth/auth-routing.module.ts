import { NgModule } from "@angular/core";
import { LoginComponent } from "./components/login/login.component";
import { RouterModule, Routes } from "@angular/router";
import { LogoutComponent } from "./components/logout/logout.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent}    
]

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AuthRoutingModule{

}