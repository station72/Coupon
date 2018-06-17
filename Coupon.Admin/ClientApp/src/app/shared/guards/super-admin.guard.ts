import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { UserRole } from "../data/user/user-roles";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class SuperAdminGuard implements CanActivate, CanActivateChild { 
    constructor(
        private authService: AuthService
    ){  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(this.authService.isLoggedIn() === false){
            return false;
        }
        
        let user = this.authService.getCurrentUser();
        return user.role === UserRole.SuperAdmin;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }
}