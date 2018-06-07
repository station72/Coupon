import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BadInputErrorsService {
  private badInputErrors : Subject<string[]> = new Subject(); 
  public badInputErrors$ : Observable<string[]> = from(this.badInputErrors); //this.badInputErrors.asObservable().pipe(publish(), refCount());

  constructor() {
   }

  public showErrors(errors: string[]): void{
    this.badInputErrors.next(errors);
  }

  public showHttpError(httpError: HttpErrorResponse){
    let errors : string[] = [];
    for (const errorName of Object.keys(httpError.error)) {
      const fieldErrors = httpError.error[errorName] as string[];
      errors = errors.concat(fieldErrors);
    }

    this.showErrors(errors);
  }
}
