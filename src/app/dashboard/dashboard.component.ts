import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // acno=""
  // pswd=""
  // amount=""

  // acno1=""
  // pswd1=""
  // amount1=""


  depositForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  
  })

  withdrawForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  
  })

  user:any
  ldate:any
  acno=""
                                                              //to use navigateByUrl()
  constructor(private ds:DataService,private fb:FormBuilder,private router:Router) {
    this.user=localStorage.getItem('currentUser')  //for welcome user-name
    this.ldate=new Date()   //dashboard page open time display so give in constructor//s/m date is store in ldate
   }

  ngOnInit(): void {
    if(!localStorage.getItem("token")){   //only loginned person have token
      alert("please Log In")
      this.router.navigateByUrl("")
    }

   
  }


  deposit(){
    // alert("deposit clicked")
    var acno=this.depositForm.value.acno
    var pswd=this.depositForm.value.pswd
    var amount=this.depositForm.value.amount

    if(this.depositForm.valid){
      this.ds.deposit(acno,pswd,amount)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
        }
      },
      result=>{
        alert(result.error.message)
      }
      )

    }
    else{
      alert("invalid form")
    }
    
  }

  withdraw(){
    // alert("wuthdraw clicked")
    var acno=this.withdrawForm.value.acno
    var pswd=this.withdrawForm.value.pswd
    var amount=this.withdrawForm.value.amount

    if(this.withdrawForm.valid){
      this.ds.withdraw(acno,pswd,amount)
      .subscribe((result:any)=>{
        if(result){
          alert(result.message)
        }
      },
      result=>{
        alert(result.error.message)
      }
      )

   }
    else{
      alert("invalid form")
    }
    
  }

  logout(){

    localStorage.removeItem("currentUser")
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("token")

    this.router.navigateByUrl("")

  }

  // when first main delete button click
  deleteAccount(){
    this.acno=JSON.parse(localStorage.getItem('currentAcno')||'')   //when delete button clicked login user acno ie.currentacno will assign to acno,this value is given to child,and when that value come should show child's div

  }
  //when cancel button click
  cancell(){
    this.acno=""
  }


  //to delete account
             //acno
  onDelete(event:any){
    // alert('from parent:'+event)
    //asynchronous so subscribe to resolve
    this.ds.deleteAcc(event)
    .subscribe((result:any)=>{
      if(result){
        alert(result.message)
        localStorage.removeItem("currentUser")
        localStorage.removeItem("currentAcno")
        localStorage.removeItem("token")
    
        this.router.navigateByUrl("")
      }
    },
    result=>{
      alert(result.error.message)
    }
    )
  }

}
