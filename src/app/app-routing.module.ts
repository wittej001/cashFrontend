import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoanViewComponent } from './loan-view/loan-view.component'
import { TableViewComponent } from './table-view/table-view.component'

const routes: Routes = [
  { path: 'table-view', component: TableViewComponent },
  { path: 'loan-view', component: LoanViewComponent },
  { path: '',   redirectTo: '/loan-view', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
