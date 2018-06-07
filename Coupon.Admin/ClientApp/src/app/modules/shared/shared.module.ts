import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { BadInputErrorsService } from '../../shared/services/bad-input-errors.service';
import { BrowserModule } from '@angular/platform-browser';
import { BadInputErrorsComponent } from './components/bad-input-errors/bad-input-errors.component';
import { HttpService } from './services/http.service';

@NgModule({
  imports: [
    SharedRoutingModule,
    BrowserModule
  ],
  declarations: [
    BadInputErrorsComponent
  ],
  providers:[
    BadInputErrorsService
  ],
  exports:[
    SharedRoutingModule,
    BadInputErrorsComponent
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
