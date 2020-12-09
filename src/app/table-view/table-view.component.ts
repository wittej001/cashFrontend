import { Component, OnInit } from '@angular/core';
import { Loan } from '../Loan';
import { LoanService } from '../loan.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit {

  private AllData : Loan[] = [];
  
  loans : Loan[] = [];
   
  aggregate? : Loan;

  constructor(private loanSerivce : LoanService, private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
      let ids = params._ids;
      ids ? this.getAllData(ids) : this.getAllData();
    });
  }

  newLoan(principal: string, term: string, rate: string){
    if (!this.checkInput(principal, term, rate)){
      alert("Please enter valid loan inputs.")
    }else if (!this.checkTotalTerms(term)){
      alert("Terms exceed total limit.")
    }
    else{
      this.loanSerivce.addLoan({ principal, rate, term } as unknown as Loan)
      .subscribe(() => 
        {this.getAllData();
      });
    }
    
  }

  deleteLoan(loan : Loan | undefined){
    if(typeof loan != 'undefined' ){
      this.loanSerivce.deleteLoan(loan)
        .subscribe(() => {
          this.getAllData();
        });
    }
  }

  getAllData(ids : any = null) : void{
    this.loanSerivce.getAllData(ids)
    .subscribe(AllData => {
      this.AllData = AllData
      if (this.AllData.length > 1){
        this.aggregate = this.AllData?.pop();
      }
      this.loans = this.AllData;
    });

    
  }

  private checkTotalTerms(term : string) : boolean{
    const limit = 10000;
    const termNum = Number.parseFloat(term)
    let totalMonths : number = termNum;
    for (let loan of this.loans){
      totalMonths += loan.term;
    }
    if(totalMonths > limit){
      return false;
    }else{
      return true;
    }
  }
  
  private checkInput(principal: string, term: string, rate: string) : boolean {  
    const principalNum = Number.parseFloat(principal)
    const termNum = Number.parseFloat(term)
    const rateNum = Number.parseFloat(rate)
    
    if (principalNum <= 0){
      return false
    } 
    else if (termNum <= 0 || !Number.isInteger(termNum)){
      return false
    }
    else if (rateNum <= 0 || rateNum > 100){
      return false
    }
    else{
      return true
    }
  }
}