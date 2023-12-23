import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'orders', loadChildren: () => import('./modules/ordercart/ordercart.module').then(m => m.OrdercartModule)},
  {path: 'payments', loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)},
  {path: '', redirectTo: '/orders', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
