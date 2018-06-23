import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ListResult } from "src/app/shared/data/list-result.dto";
import { PagingOutDto } from "../../../shared/data/paging/paging-out.dto";
import { HttpService } from "../../shared/services/http.service";


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

  delete(id: string): Observable<any> {
    return this.http.delete(this.serviceBaseUrl + "/" + id).pipe(
      map(res => {
        return res.body;
      })
    );
  }

  block(id: string | number): Observable<any> {
    return this.http
      .post<any>(this.serviceBaseUrl + "/" + id + "/block", {})
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }

  unblock(id: string | number): Observable<any> {
    return this.http
      .post<any>(this.serviceBaseUrl + "/" + id + "/unblock", {})
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}
