import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpResponseBase
} from "@angular/common/http";

import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { map, catchError } from "rxjs/operators";

@Injectable()
export class ProviderService {
  private baseUrl = "http://localhost:4200/api";
  private serviceBaseUrl = "/providers";
  constructor(private http: HttpClient) {}

  getProvider(id: string): Observable<ProviderDto> {
   var result =  this.http
      .get<ProviderDto>(this.baseUrl + this.serviceBaseUrl + "/" + id, {
        observe: "response"
      })
      .pipe(
        map(response => {
          if (!response.ok) {
            console.log(response);
            throw new Error("Get provider error!");
          }

          return response.body;
        })
      );

      return result;
  }

  getList() {
    this.http
      .get(this.baseUrl + this.serviceBaseUrl, {})
      .subscribe(this.subscribe, this.onError);
  }

  private subscribe(response: HttpResponseBase) {
    console.log();
  }

  private onError(error: HttpErrorResponse) {
    console.log(error);
  }
}
