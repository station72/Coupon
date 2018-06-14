import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Injectable, OnInit } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { HttpService } from "../../shared/services/http.service";
import { ListResult } from "src/app/shared/data/list-result.dto";
import { PagingOutDto } from "../../../shared/data/paging/paging-out.dto";

@Injectable()
export class ProviderService {
  private readonly serviceBaseUrl = "/providers";

  constructor(private http: HttpService) {}

  getProvider(id: string): Observable<ProviderDto> {
    var result = this.http
      .get<ProviderDto>(this.serviceBaseUrl + "/" + id)
      .pipe(
        map(response => {
          return response.body;
        })
      );

    return result;
  }

  getList(data: PagingOutDto): Observable<ListResult<ProviderDto>> {
    return this.http
      .get<ListResult<ProviderDto>>(this.serviceBaseUrl, data)
      .pipe(
        map(response => {
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

  update(id: string, data: any): Observable<ProviderDto> {
    return this.http
      .put<ProviderDto>(this.serviceBaseUrl + "/" + id, data)
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  delete(id: string): any {
    return this.http.delete(this.serviceBaseUrl + "/" + id).pipe(
      map(res => {
        return res.body;
      })
    );
  }
}
