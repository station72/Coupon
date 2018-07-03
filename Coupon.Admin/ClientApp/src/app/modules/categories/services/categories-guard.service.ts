import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { UserRole } from "../../../shared/data/user/user-roles";
import { AuthService } from "../../../shared/services/auth.service";

@Injectable()
export class CategoriesGuardService implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const currentUrl = state.url;

    var access =
      this.authService.isLoggedIn() &&
      this.authService.getCurrentUser().role > UserRole.Admin;

    if (access === false) {
      this.router.navigate(["login"], {
        queryParams: {
          returnUrl: currentUrl
        }
      });
    }

    return access;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }
}
