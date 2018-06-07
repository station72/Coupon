import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    // BadInputErrorsComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AuthRoutingModule
  ],
  providers:[
  ]
})
export class AuthModule { }
