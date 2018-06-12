import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AdminDto } from "../dto/admin.dto";
import { Observable } from "rxjs";
import { AdminsService } from "../services/admins.service";

@Injectable()
export class AdminUpdateResolver implements Resolve<AdminDto> {
    
    constructor(
        private adminService: AdminsService
    ){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): AdminDto | Observable<AdminDto> | Promise<AdminDto> {
        const adminId = route.params['id'];
        if(!adminId){
            throw new Error("adminId error");
        }
        return this.adminService.getAdmin(adminId);
    }
}
