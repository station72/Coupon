import { Injectable } from '@angular/core';
import { publish, refCount } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable()
export class NotificationService {
  private notification: Subject<string> = new Subject();
  public notification$: Observable<string> = this.notification.asObservable().pipe(publish(), refCount());
  constructor() {}

  notify(message: any) {
    this.notification.next(message);
    // setTimeout(() => this.notification.next(null), 3000);
  }
}