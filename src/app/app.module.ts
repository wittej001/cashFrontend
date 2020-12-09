import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { TableViewComponent } from './table-view/table-view.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoanViewComponent } from './loan-view/loan-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanDetailComponent,
    TableViewComponent,
    NavBarComponent,
    LoanViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
