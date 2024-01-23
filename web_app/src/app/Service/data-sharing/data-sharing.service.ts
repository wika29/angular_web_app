import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private isBooleanValue = new BehaviorSubject<boolean>(false);

  setBigCardVisibility(value: boolean): void {
    this.isBooleanValue.next(value);
  }

  getBigCardVisibility(): Observable<boolean> {
    return this.isBooleanValue.asObservable();
  }
}
