import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  //properties
  aim="perfect banking partner" //string interpolation
  accno="account number please"     //property binding
  acno=""
  pswd=""

loginForm=this.fb.group({
  acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]

})
  

  //database
  // db:any={
  //   1000:{"acno":1000,"username":"neer","password":1000,"balance":50000},
  //   1001:{"acno":1001,"username":"ram","password":1001,"balance":3000},
  //   1002:{"acno":1002,"username":"sushmitha","password":1002,"balance":600000}

  // }
  
  //dependency injection
  constructor(private router:Router , private ds:DataService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  
  
  //userdefined function

  acnoChange(event:any){
    // console.log(event.target.value);
    this.acno=event.target.value
    console.log(this.acno);
    

    

  }
  pswdChange(event:any){
    // console.log(event.target.value);
    this.pswd=event.target.value
    console.log(this.pswd);
    

    

  }
    login(){
    var acno=this.loginForm.value.acno
    var pswd=this.loginForm.value.pswd

    if(this.loginForm.valid){
      const result=this.ds.login(acno,pswd)
      .subscribe((result:any)=>{
        if(result){
          localStorage.setItem('currentUser',result.currentUser) //storin in sm local storage th is get from server for further use
          localStorage.setItem('currentAcno',result.currentAcno)
          localStorage.setItem('token',result.token)

          alert(result.message)
          this.router.navigateByUrl('dashboard')
  
        }
  

      },
      result=>{
        alert(result.error.message)
      }
      )
    }
    else{
      ("invalid form")
    }

    
  
  }



  // login(){
  //   // alert("login clicked")
  //   var acno=this.acno
  //   var pswd=this.pswd
  //   let db=this.db
  //   if(acno in db){
  //     if(pswd==db[acno]["password"]){
  //       alert("login successful")
  //       this.router.navigateByUrl('dashboard')

  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("user does not exist")
  //   }

  
  // }

  //template referencing variable
  // login(a:any,p:any){
  //   console.log(a.value);
    
  //   var acno=a.value
  //   var pswd=p.value
  //   let db=this.db
  //   if(acno in db){
  //     if(pswd==db[acno]["password"]){
  //       alert("login successful")

  //     }
  //     else{
  //       alert("incorrect password")
  //     }
  //   }
  //   else{
  //     alert("user does not exist")
  //   }

  
  // }


}
