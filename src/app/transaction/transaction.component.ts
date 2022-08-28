import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  //array to hold all transactions made by given account
  transaction:any
  acno=JSON.parse(localStorage.getItem("currentAcno")||'')

               //dependency injection
  constructor(private ds:DataService) { 

    this.transaction=this.ds.getTransaction(this.acno)
    .subscribe((result:any)=>{
      this.transaction=result.transaction
    },
    (result)=>{
      alert(result.error.message)
    }
    
    )
    // console.log(this.transaction);
    
   }

  ngOnInit(): void {
  }

}
