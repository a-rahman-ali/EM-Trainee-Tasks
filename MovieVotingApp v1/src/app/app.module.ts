import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MovieVotingIndexComponent } from './components/movie-voting-index/movie-voting-index.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieVotingIndexComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
