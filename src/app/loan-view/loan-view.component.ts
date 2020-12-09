import { Component, OnInit } from '@angular/core';
import { Loan } from '../Loan';
import { LoanService } from '../loan.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-view',
  templateUrl: './loan-view.component.html',
  styleUrls: ['./loan-view.component.css']
})
export class LoanViewComponent implements OnInit {

  private AllData : Loan[] = [];
  
  loans : Loan[] = [];
   
  aggregate? : Loan;

  loansToDisplay : number[] = [];

  constructor(private loanSerivce : LoanService, private router : Router) { }

  ngOnInit(): void {
    this.getAllData();
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

  addQue(id : number){
    this.loansToDisplay.push(id); 
  }

  navigateToTableView() {
    let ids = this.loansToDisplay.join();
    this.router.navigate(['/table-view'], { queryParams: { _ids: ids } });
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
