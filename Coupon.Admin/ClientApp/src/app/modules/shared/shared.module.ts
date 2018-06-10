import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { BadInputErrorsService } from '../../shared/services/bad-input-errors.service';
import { BrowserModule } from '@angular/platform-browser';
import { BadInputErrorsComponent } from './components/bad-input-errors/bad-input-errors.component';
import { HttpService } from './services/http.service';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';

@NgModule({
  imports: [
    SharedRoutingModule,
    BrowserModule
  ],
  declarations: [
    BadInputErrorsComponent,
    FieldErrorDisplayComponent
  ],
  providers:[
    BadInputErrorsService
  ],
  exports:[
    SharedRoutingModule,
    BadInputErrorsComponent,
    FieldErrorDisplayComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ 
        BadInputErrorsService,
        HttpService 
      ],
    }
 }
}
