import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { HttpService } from "../../shared/services/http.service";

@Injectable()
export class ProviderService {
  private serviceBaseUrl = "/providers";

  constructor(private http: HttpService) {}

  getProvider(id: string): Observable<ProviderDto> {
    var result = this.http
      .get<ProviderDto>(this.serviceBaseUrl + "/" + id)
      .pipe(
        map(response => {
          //TODO: will be here after 404?
          debugger;
          return response.body;
        })
      );

    return result;
  }

  getList(): Observable<ProviderDto[]> {
    return this.http.get<ProviderDto[]>(this.serviceBaseUrl).pipe(
      map(response => {
        debugger;
        return response.body;
      })
    );
  }

  create(data: any): Observable<ProviderDto> {
    return this.http.post<ProviderDto>(this.serviceBaseUrl, data).pipe(
      map(response => {
        return response.body;
      })
    );
  }
}
