import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentCompComponent } from './payment-comp/payment-comp.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'payment-comp', component: PaymentCompComponent}
];

@NgModule({
  declarations: [
    PaymentCompComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PaymentsModule { }
