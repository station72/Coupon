import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ErrorRoutingModule } from './errors-routing.module';
import { ErrorComponent } from './components/errors/error.component';
import { ErrorsService } from './services/errors.service';
import { ErrorsHandler } from './handlers/errors.handler';
import { ServerErrorsInterceptor } from './interceptors/server-errors.interceptor';
import { NotificationService } from '../../shared/services/notifications.service';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ErrorRoutingModule,
    // BrowserModule
  ],
  declarations: [
    ErrorComponent
  ],
  providers: [
    ErrorsService,
    NotificationService,
    // {
    //   provide: ErrorHandler,
    //   useClass: ErrorsHandler,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ServerErrorsInterceptor,
    //   multi: true
    // },
  ],
  exports:[
    ErrorComponent
  ]
})
export class ErrorsModule { }
