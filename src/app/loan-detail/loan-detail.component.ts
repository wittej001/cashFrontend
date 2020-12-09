import { Component, Input } from '@angular/core';
import { Loan } from '../Loan';
import { TableViewComponent } from '../table-view/table-view.component';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent{

  @Input() caption? : string;
  @Input() loan? : Loan;
  @Input() tableView? : TableViewComponent;

}
