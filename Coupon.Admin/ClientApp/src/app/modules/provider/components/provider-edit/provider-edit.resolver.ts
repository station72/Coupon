import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ProviderService } from "src/app/modules/provider/services/provider.service";

@Injectable()
export class ProviderEditResolver implements Resolve<ProviderDto> {

    constructor(private providerServise: ProviderService){
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): ProviderDto | Observable<ProviderDto> | Promise<ProviderDto> {
        const providerId = route.params['id'];
        if(!providerId){
            throw new Error("Provider id is empty!");
        }
        return this.providerServise.getProvider(providerId);
    }
}