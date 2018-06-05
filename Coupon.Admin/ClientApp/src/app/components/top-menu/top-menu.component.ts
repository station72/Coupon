import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-top-menu",
  templateUrl: "top-menu.component.html"
})
export class TopMenuComponent implements OnInit {
  private isLoggingOut = false;
  public isLoggedIn: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshIsLoggedIn();

    this.authService.userChanged.subscribe(user => {
      this.refreshIsLoggedIn();
    });
  }

  private refreshIsLoggedIn(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log("isLoggedIn = " + this.authService.getCurrentUser());
  }

  onLogout() {
    this.authService.logout();
  }
}
