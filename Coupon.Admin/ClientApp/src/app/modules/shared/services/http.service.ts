import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { UrlTree } from '@angular/router';

@Injectable()
export class HttpService {
  private baseUrl = 'http://localhost:43809/api';
  //private baseUrl = 'http://localhost:5000/api';
  
  constructor(private http: HttpClient) {
  }

  private readonly observe = 'response';
  private readonly withCredentials = true;
  private readonly headers = {
    'Content-Type': 'application/json'    
  };

  private getUrl(uri: string) : string{
    return this.baseUrl + uri;
  }

  public get<T>(uri: string, params = {}): Observable<HttpResponse<T>>{
    if(isDevMode()){
      console.log("GET uri = " + uri);
    }
    return this.http.get<T>(this.getUrl(uri), {
      params : params, 
      observe: this.observe,
      withCredentials: this.withCredentials,
      headers: this.headers
    })
  }

  public postFormData<T>(uri, data: FormData): Observable<HttpResponse<T>>{
    return this.http.post<T>(this.getUrl(uri), data, {
      observe: this.observe,
      withCredentials: this.withCredentials
    })
  }

  public post<T>(uri, data: any): Observable<HttpResponse<T>>{
    if(isDevMode()){
      console.log("POST uri = " + uri, " data = " + data);
    }
    return this.http.post<T>(this.getUrl(uri), data, {
      observe: this.observe,
      withCredentials: this.withCredentials,
      headers: this.headers
    })
  }

  public put<T>(uri: string, data: any): Observable<HttpResponse<T>> {
    if(isDevMode()){
      console.log("PUT uri = " + uri, " data = " + data);
    }
    return this.http.put<T>(this.getUrl(uri), data, {
      observe: this.observe,
      withCredentials: this.withCredentials,
      headers: this.headers
    })
  }

  delete(uri: string): Observable<any> {
    if(isDevMode()){
      console.log("DELETE uri = " + uri);
    }
    return this.http.delete(this.getUrl(uri), {
      observe: this.observe,
      withCredentials: this.withCredentials,
      headers: this.headers
    })
  }
}
