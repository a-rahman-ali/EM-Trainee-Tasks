import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdercartModule } from './modules/ordercart/ordercart.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { DataTransferService } from './services/data-transfer.service';
import { Routes } from '@angular/router';
import { OrdersComponent } from './modules/ordercart/orders/orders.component';

const routes: Routes = [
  {path: '', redirectTo: '/orders', pathMatch: 'full'},
  
]

@NgModule({
  declarations: [ AppComponent, OrdersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdercartModule,
    PaymentsModule,
  ],
  providers: [DataTransferService],
  bootstrap: [AppComponent]
  // bootstrap: [OrdersComponent]
})
export class AppModule { }
