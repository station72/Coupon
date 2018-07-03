import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminsListComponent } from './components/admins-list/admins-list.component';
import { AdminsCreateComponent } from './components/admins-create/admins-create.component';
import { AdminsUpdateComponent } from './components/admins-update/admins-update.component';
import { AdminsUpdatePasswordComponent } from './components/admins-update-password/admins-update-password.component';
import { AdminsRootComponent } from './components/admins-root/admins-root.component';
import { AdminUpdateResolver } from './resolvers/admin-update.resolver';
import { AdminsService } from './services/admins.service';
import { SharedModule } from '../shared/shared.module';
import { AdminsRoutingModule } from './admins-routing.module';
import { AdminFormFactoryService } from './services/admin-form-factory.service';

@NgModule({
  imports: [
    AdminsRoutingModule,
    // BrowserModule,
    ReactiveFormsModule, 
    SharedModule
  ],
  declarations: [
    AdminsListComponent, 
    AdminsCreateComponent, 
    AdminsUpdateComponent, 
    AdminsUpdatePasswordComponent, 
    AdminsRootComponent
  ],
  providers: [
    AdminUpdateResolver,
    AdminsService,
    AdminFormFactoryService
  ]
})
export class AdminsModule { }
