import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ResearchDeptComponent } from './components/research-dept/research-dept.component';
import { TechnologyComponent } from './components/technology/technology.component';
import { BusinessComponent } from './components/business/business.component';
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
import { PageNotFoundErrorComponent } from './components/page-not-found-error/page-not-found-error.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResearchDeptComponent,
    TechnologyComponent,
    BusinessComponent,
    CatalystComponent,
    OneResearchComponent,
    MarketingComponent,
    SalesComponent,
    AccountsComponent,
    SoftEnggComponent,
    PublicationComponent,
    CloudEnggComponent,
    DataTransformationComponent,
    PassportComponent,
    IssacComponent,
    EcomComponent,
    DT1Component,
    DT2Component,
    DT3Component,
    PP1Component,
    PP2Component,
    PP3Component,
    PP4Component,
    PageNotFoundErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
