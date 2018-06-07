import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { publish, refCount } from 'rxjs/operators';

@Injectable()
export class BadInputErrorsService {
  private badInputErrors : Subject<string[]> = new Subject(); 
  public badInputErrors$ : Observable<string[]> = from(this.badInputErrors); //this.badInputErrors.asObservable().pipe(publish(), refCount());

  constructor() {
   }

  public showErrors(errors: string[]): void{
    this.badInputErrors.next(errors);
  }
}
