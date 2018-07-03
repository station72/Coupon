import { NgModule, ModuleWithProviders } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { BadInputErrorsService } from '../../shared/services/bad-input-errors.service';
import { BadInputErrorsComponent } from './components/bad-input-errors/bad-input-errors.component';
import { HttpService } from './services/http.service';
import { FieldErrorDisplayComponent } from './components/field-error-display/field-error-display.component';
import { ListPaginationComponent } from './components/list-pagination/list-pagination.component';
import { EnumAsStringPipe } from './pipes/enum-as-string.pipe';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { CommonModule } from '@angular/common';
import { BadInputErrorsNoServiceComponent } from './components/bad-input-errors/bad-input-errors-no-service.component';
import { TooltipModule, PaginationModule } from 'ngx-bootstrap';
import { BooleanAsStringPipe } from './pipes/boolean-to-string.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { NumberPickerModule } from 'ng-number-picker';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NumberPickerModule,
  ],
  declarations: [
    BadInputErrorsComponent,
    BadInputErrorsNoServiceComponent,
    FieldErrorDisplayComponent,
    ListPaginationComponent,
    EnumAsStringPipe,
    BooleanAsStringPipe,
    ModalConfirmComponent
  ],
  providers:[
    BadInputErrorsService,
    BsModalService
  ],
  exports:[
    BadInputErrorsComponent,
    BadInputErrorsNoServiceComponent,
    FieldErrorDisplayComponent,
    ListPaginationComponent,
    EnumAsStringPipe,
    BooleanAsStringPipe,
    ModalConfirmComponent,
    ReactiveFormsModule,
    BsDatepickerModule, 
    NumberPickerModule,
    CommonModule
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
