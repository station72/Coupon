import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";
import { HttpClient } from "@angular/common/http";
import { UserRole } from "../data/user/user-roles";
import { map } from "rxjs/operators";
import { AuthService } from "../services/auth.service";

export class SuperAdminGuard implements CanActivate {
    
    constructor(
        private http: HttpClient,
        private authService: AuthService
    ){  }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(this.authService.isLoggedIn() === false){
            return false;
        }
        
        let user = this.authService.getCurrentUser();
        return user.role === UserRole.SuperAdmin;
    }
}