import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { UserRole } from '../../shared/data/user/user-roles';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  constructor(private authService: AuthService){

  }  

  isLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  isProvider(): boolean{
    return this.authService.isLoggedIn() && this.authService.getCurrentUser().role === UserRole.Provider;
  }

  isAdminOrHight():boolean{
    return this.authService.isLoggedIn() && this.authService.getCurrentUser().role >= UserRole.Admin;
  }

  isSuperAdmin():boolean{
    return this.authService.isLoggedIn() && this.authService.getCurrentUser().role === UserRole.SuperAdmin;
  }
}
