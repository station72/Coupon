import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-top-menu",
  templateUrl: "top-menu.component.html"
})
export class TopMenuComponent implements OnInit {
  public isLoggedIn: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.refreshIsLoggedIn();

    this.authService.userChanged.subscribe(user => {
      this.refreshIsLoggedIn();
    });
  }

  private refreshIsLoggedIn(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onLogout() {
    this.authService.logout();
    let res = this.router.navigate(['login']);
    console.log(res);
  }
}
