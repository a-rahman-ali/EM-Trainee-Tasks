import { Component, OnInit } from '@angular/core';
import { DataTransferService } from '../../../services/data-transfer.service';

@Component({
  selector: 'app-payment-comp',
  templateUrl: './payment-comp.component.html',
  styleUrls: ['./payment-comp.component.css']
})
export class PaymentCompComponent  {
  orderData: any;
  constructor(private dataTransferService: DataTransferService){}
  ngOnInit(){
    this.dataTransferService.orderData$.subscribe((data) => {
      this.orderData = data;
    });
  }
}
