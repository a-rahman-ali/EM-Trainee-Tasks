import { Component } from '@angular/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  constructor(private dataTransferService: DataTransferService){}

  orderData: any[] = [
    {product: 'Fridge', price: 18000},
    { product : 'TV', price: 32000}
  ];
  transferOrderData(){
    this.dataTransferService.transferOrderData(this.orderData);
  }
}
