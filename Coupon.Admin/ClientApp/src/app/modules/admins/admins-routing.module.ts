import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SuperAdminGuard } from 'src/app/shared/guards/super-admin.guard';
import { AdminsRootComponent } from './components/admins-root/admins-root.component';
import { AdminsListComponent } from './components/admins-list/admins-list.component';
import { AdminsCreateComponent } from './components/admins-create/admins-create.component';
import { AdminsUpdateComponent } from './components/admins-update/admins-update.component';
import { AdminUpdateResolver } from './resolvers/admin-update.resolver';
import { AdminsUpdatePasswordComponent } from './components/admins-update-password/admins-update-password.component';

const routes: Routes = [
  { 
      path: 'admins', 
      component: AdminsRootComponent,
      canActivate: [SuperAdminGuard],
      children: [
          {
              path: '', 
              component: AdminsListComponent
          },
          {
              path: 'create',
              component: AdminsCreateComponent
          },
          {
              path: 'updatepassword/:id',
              component: AdminsUpdatePasswordComponent
          },
          {
              path: 'update/:id',
              component: AdminsUpdateComponent,
              resolve: {
                   admin: AdminUpdateResolver
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
export class AdminsRoutingModule { }
