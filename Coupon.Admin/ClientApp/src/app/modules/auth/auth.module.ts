import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { LogoutComponent } from './components/logout/logout.component';
import { SharedModule } from '../shared/shared.module';
import { LoginFormFactoryService } from './services/login-form-factory.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  providers:[
    LoginFormFactoryService
  ]
})
export class AuthModule { }
