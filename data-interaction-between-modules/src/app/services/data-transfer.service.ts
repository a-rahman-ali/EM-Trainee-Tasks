import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private orderDataSubject = new BehaviorSubject<any>(null);
  orderData$ = this.orderDataSubject.asObservable();

  transferOrderData(orderData: any){
    this.orderDataSubject.next(orderData);
  }
}
