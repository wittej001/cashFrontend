import { Component, OnInit } from '@angular/core';
import { Loan } from '../Loan';
import { LoanService } from '../loan.service'

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {
  //Ask Dale why we need to initialize all of these but didn't have to in the tutorial
  AllData? : Loan[];
  
  
  loans : any[] = [{
    type: "loan",
    principal: 16000,
    term: 16,
    rate: 6,
    cashflow: [
           {
             month: 111,
             principal: 100,
             interest:  1,
             remaining_balance: 1
            },
           {
             month: 2,
             principal: 2,
             interest:  2,
             remaining_balance: 2
            },
            {
             month: 3,
             principal: 3,
             interest:  3,
             remaining_balance: 3
            }
     ]
   },
   {
    type: "loan",
    principal: 16000,
    term: 16,
    rate: 6,
    cashflow: [
           {
             month: 1,
             principal: 100,
             interest:  1,
             remaining_balance: 1
            },
           {
             month: 2,
             principal: 2,
             interest:  2,
             remaining_balance: 2
            },
            {
             month: 3,
             principal: 3,
             interest:  3,
             remaining_balance: 3
            }
     ]
   },];
   
  aggregate : any = {cashflow: [
    {
      month: 1,
      principal: 100,
      interest:  1,
      remaining_balance: 1
     },
    {
      month: 2,
      principal: 2,
      interest:  2,
      remaining_balance: 2
     },
     {
      month: 3,
      principal: 3,
      interest:  3,
      remaining_balance: 3
     }
  ]}

  constructor(private loanSerivce : LoanService) { }

  ngOnInit(): void {
    this.getAllData();

  }

  newLoan(principal: string, term: string, rate: string){
    //as unkown as Loan was a quickfix... 
    this.loanSerivce.addLoan({ principal, rate, term } as unknown as Loan)
      .subscribe();
    this.getAllData();
  }

  deleteLoan(loan : Loan){
    this.loans = this.loans.filter(l => l !== loan);
    this.loanSerivce.deleteLoan(loan).subscribe();
  }

  getAllData() : void{
    this.loanSerivce.getAllData()
    .subscribe(AllData => this.AllData = AllData);
  }
}

