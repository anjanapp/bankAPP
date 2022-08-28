import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // uname=""
  // acno=""
  // pswd=""

  //form group
  registerForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]]
  })
 

  constructor(private ds:DataService , private router:Router,private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  // register definition--when button clicked it will come here
  register(){
    // alert("register clicked")
    var uname=this.registerForm.value.uname
    var acno=this.registerForm.value.acno
    var pswd=this.registerForm.value.pswd


  if(this.registerForm.valid){
    //asynchronous

    this.ds.register(uname,acno,pswd) //function call to register in ds
    .subscribe((result:any)=>{    //response from server (json data) from dataservice
      if(result){
        alert(result.message)     // response--200 series statuscode resolving
        this.router.navigateByUrl("")
      }
  
      
    },
    result=>{
      alert(result.error.message)    //another callback function  //response--400 series statuscode resolving,but here both 200 and 400 come only error msg here
      
    }
    )


  }
  else{
    alert("invalid form")
  }
  }

}
