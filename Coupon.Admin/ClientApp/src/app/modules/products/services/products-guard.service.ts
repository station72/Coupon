import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/shared/data/user/user-roles';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable()
export class ProductsGuardService implements CanActivate, CanActivateChild{
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    //TODO: copy paste with ProviderGuard
    const currentUrl = state.url;

    if (this.authService.isLoggedIn() === false) {
       this.redirectToLogin(currentUrl);
       return false;
    }

    const user = this.authService.getCurrentUser();
     const result = user.role >= UserRole.Provider;

    if (result === false) {
       this.redirectToLogin(currentUrl);      
    }

    return result;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  private redirectToLogin(returnUrl: string) {
    this.router.navigate(["login"], {
      queryParams: {
        returnUrl: returnUrl
      }
    });
  }

}
