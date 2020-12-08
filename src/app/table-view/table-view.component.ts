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
  private AllData : Loan[] = [];
  
  
  loans : Loan[] = [];
   
  aggregate? : Loan;

  constructor(private loanSerivce : LoanService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  newLoan(principal: string, term: string, rate: string){
    //as unkown as Loan was a quickfix... 
    this.loanSerivce.addLoan({ principal, rate, term } as unknown as Loan)
      .subscribe(() => 
        {this.getAllData();
      });
  }

  deleteLoan(loan : Loan){
    this.loanSerivce.deleteLoan(loan)
      .subscribe(() => {
        this.getAllData();
      });
    
  }

  getAllData() : void{
    this.loanSerivce.getAllData()
    .subscribe(AllData => {
      this.AllData = AllData
      if (this.AllData.length > 1){
        this.aggregate = this.AllData?.pop();
      }
      this.loans = this.AllData;
    });

    
  }
}

