import { Component } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  public isLoggingOut = false;
  constructor(private authService: AuthService) { }

  onLogout(){
    this.isLoggingOut = true;
    this.authService.logout();
  }

  isLoggedIn():boolean{
    return this.authService.isLoggedIn();
  }

}
