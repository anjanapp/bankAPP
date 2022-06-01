import { Component, OnInit } from '@angular/core';
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

  //database
  // db:any={
  //   1000:{"acno":1000,"username":"neer","password":1000,"balance":50000},
  //   1001:{"acno":1001,"username":"ram","password":1001,"balance":3000},
  //   1002:{"acno":1002,"username":"sushmitha","password":1002,"balance":600000}

  // }
  
  //dependency injection
  constructor(private router:Router , private ds:DataService) { }

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
    var acno=this.acno
    var pswd=this.pswd

    const result=this.ds.login(acno,pswd)
    if(result){
        alert("login successful")
        this.router.navigateByUrl('dashboard')

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
