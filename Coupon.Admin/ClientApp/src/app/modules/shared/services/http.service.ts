import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UrlTree } from '@angular/router';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:43809/api';
  constructor(private http: HttpClient) {
  }

  private readonly observe = 'response';
  private readonly withCredentials = true;

  public get<T>(uri): Observable<HttpResponse<T>>{
    return this.http.get<T>(this.baseUrl + uri, {
      observe: this.observe,
      withCredentials: this.withCredentials
    })
  }

  public post<T>(uri, data: any): Observable<HttpResponse<T>>{
    if(isDevMode()){
      console.log("uri = " + uri, " data = " + data);
    }
    return this.http.post<T>(this.baseUrl + uri, data, {
      observe: this.observe,
      withCredentials: this.withCredentials,
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
}
