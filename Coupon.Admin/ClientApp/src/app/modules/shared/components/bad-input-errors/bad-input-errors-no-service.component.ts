import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BadInputErrorsService } from 'src/app/shared/services/bad-input-errors.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bad-input-errors-ns',
  templateUrl: './bad-input-errors.component.html',
  styleUrls: ['./bad-input-errors.component.css']
})
export class BadInputErrorsNoServiceComponent {

  public errors: string[] = [];

  public close(){
    this.errors = [];
  }

  public showHttpError(httpError: HttpErrorResponse){
    let errors : string[] = [];
    for (const errorName of Object.keys(httpError.error)) {
      const fieldErrors = httpError.error[errorName] as string[];
      errors = errors.concat(fieldErrors);
    }

    this.errors = errors;
  }
}
