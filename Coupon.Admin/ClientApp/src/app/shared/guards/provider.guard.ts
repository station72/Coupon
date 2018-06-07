import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { UserRole } from "../data/user/user-roles";

@Injectable({
  providedIn: "root"
})
export class ProviderGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const redirectUrl = state.url;

    if (this.authService.isLoggedIn() === false) {
      this.redirectToLogin(redirectUrl);
      return false;
    }

    const user = this.authService.getCurrentUser();
    const result = user.role >= UserRole.Provider;

    if (result === false) {
      this.redirectToLogin(redirectUrl);      
    }

    return result;
  }

  private redirectToLogin(currentUrl: string) {
    this.router.navigate(["login"], {
      queryParams: {
        returnUrl: currentUrl
      }
    });
  }
}
