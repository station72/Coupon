import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ProviderService } from "src/app/modules/provider/services/provider.service";
import { catchError } from "rxjs/operators";

@Injectable()
export class ProviderEditResolver implements Resolve<ProviderDto> {
  constructor(
      private providerServise: ProviderService,
      private router: Router
    ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): ProviderDto | Observable<ProviderDto> | Promise<ProviderDto> {
    const providerId = route.params["id"];
    if (!providerId) {
      throw new Error("Provider id is empty!");
    }
    return this.providerServise.getProvider(providerId);
  }
}
