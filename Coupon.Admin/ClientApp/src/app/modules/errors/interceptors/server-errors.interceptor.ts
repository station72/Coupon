import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { ErrorsService } from '../services/errors.service';
import { retry } from 'rxjs/operators';


@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private errorsService: ErrorsService,
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(retry(5));

  }
}
