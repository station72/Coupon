import { NgModule } from "@angular/core";
import { ProvidersRoutingModule } from "./providers-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { ProviderCreateComponent } from "./components/provider-create/provider-create.component";
import { ProviderListComponent } from "./components/provider-list/provider-list.component";
import { ProviderEditComponent } from "./components/provider-edit/provider-edit.component";
import { ProviderRootComponent } from './components/provider-root/provider-root.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    imports:[
        ProvidersRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule
    ],
    declarations:[
        ProviderCreateComponent,
        ProviderListComponent,
        ProviderEditComponent,
        ProviderRootComponent
    ]
})
export class ProvidersModule{

}