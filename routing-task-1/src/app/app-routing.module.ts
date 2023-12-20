import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BusinessComponent } from './components/business/business.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { ResearchDeptComponent } from './components/research-dept/research-dept.component';
import { PageNotFoundErrorComponent } from './components/page-not-found-error/page-not-found-error.component';
import { CatalystComponent } from './components/research-dept/catalyst/catalyst.component';
import { OneResearchComponent } from './components/research-dept/one-research/one-research.component';
import { MarketingComponent } from './components/business/marketing/marketing.component';
import { SalesComponent } from './components/business/sales/sales.component';
import { AccountsComponent } from './components/business/accounts/accounts.component';
import { SoftEnggComponent } from './components/technology/soft-engg/soft-engg.component';
import { PublicationComponent } from './components/technology/publication/publication.component';
import { CloudEnggComponent } from './components/technology/cloud-engg/cloud-engg.component';
import { DataTransformationComponent } from './components/technology/soft-engg/data-transformation/data-transformation.component';
import { PassportComponent } from './components/technology/soft-engg/passport/passport.component';
import { IssacComponent } from './components/technology/soft-engg/issac/issac.component';
import { EcomComponent } from './components/technology/soft-engg/ecom/ecom.component';
import { DT1Component } from './components/technology/soft-engg/data-transformation/dt1/dt1.component';
import { DT2Component } from './components/technology/soft-engg/data-transformation/dt2/dt2.component';
import { DT3Component } from './components/technology/soft-engg/data-transformation/dt3/dt3.component';
import { PP1Component } from './components/technology/soft-engg/passport/pp1/pp1.component';
import { PP2Component } from './components/technology/soft-engg/passport/pp2/pp2.component';
import { PP3Component } from './components/technology/soft-engg/passport/pp3/pp3.component';
import { PP4Component } from './components/technology/soft-engg/passport/pp4/pp4.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  // {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'researchdept', 
    component: ResearchDeptComponent,
    children : [
      {path: 'catalyst', component: CatalystComponent},
      {path: 'one-research', component: OneResearchComponent}
    ]
  },
  {
    path: 'business', 
    component:BusinessComponent,
    children : [
      {path: 'marketing', component: MarketingComponent},
      {path: 'sales', component: SalesComponent},
      {path: 'accounts', component: AccountsComponent},
    ] 
  },
  {
    path: 'technology', 
    component: TechnologyComponent,
    children: [
      {
        path: 'soft-engg', 
        component: SoftEnggComponent,
        children: [
          {
            path: 'data-transformation', 
            component: DataTransformationComponent,
            children: [
              {path : 'dt1', component: DT1Component},
              {path : 'dt2', component: DT2Component},
              {path : 'dt3', component: DT3Component},
            ]
          },
          {
            path: 'passport', 
            component: PassportComponent,
            children: [
              {path : 'pp1', component : PP1Component},
              {path : 'pp2', component : PP2Component},
              {path : 'pp3', component : PP3Component},
              {path : 'pp4', component : PP4Component},
            ]
          },
          {path: 'issac', component: IssacComponent},
          {path: 'ecom', component: EcomComponent},
        ]
      },
      {path: 'publication', component: PublicationComponent},
      {path: 'cloud-engg', component: CloudEnggComponent},
    ]
  },
  {path: '**', component: PageNotFoundErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
