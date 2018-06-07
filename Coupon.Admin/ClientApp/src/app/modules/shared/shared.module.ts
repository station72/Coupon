import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { BadInputErrorsService } from '../../shared/services/bad-input-errors.service';
import { BadInputErrorsComponent } from './bad-input-errors/bad-input-errors.component';
import { BrowserModule } from '@angular/platform-browser';

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
    BadInputErrorsComponent,
    // BadInputErrorsService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ BadInputErrorsService ],
    }
 }
}
