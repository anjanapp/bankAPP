import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options={    //assigning created object header to  options
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // currentUser:any
  // currentAcno:any
  //database
  // db:any={
  //   1000:{"acno":1000,"username":"neer","password":1000,"balance":50000,transaction:[]},
  //   1001:{"acno":1001,"username":"ram","password":1001,"balance":3000,transaction:[]},
  //   1002:{"acno":1002,"username":"sushmitha","password":1002,"balance":600000,transaction:[]}

  // }


  constructor(private http:HttpClient) {   //dependency injection
    // this.getDetails()
   }

   //get details from localstorage
  // getDetails(){
  //   if(localStorage.getItem("database")){
  //     this.db=JSON.parse(localStorage.getItem("database")|| '')
  //   }
  //   if(localStorage.getItem("currentUser")){
  //     this.currentUser=JSON.parse(localStorage.getItem("currentUser")|| '')
  //   }
  //   if(localStorage.getItem("currentAcno")){
  //     this.currentAcno=JSON.parse(localStorage.getItem("currentAcno")|| '')
  //   }


  // }

  // saveDetails(){
  //   if(this.db){
  //     localStorage.setItem("database",JSON.stringify(this.db))
  //   }
  //   if(this.currentUser){
  //     localStorage.setItem("currentUser",JSON.stringify(this.currentUser))
  //   }
  //   if(this.currentAcno){
  //     localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
  //   }

  // }

//API calling //function call--from here the http request is created and the request goes to server and server send response that response is give login() of dataservice
  login(acno:any,pswd:any){
    const data={
      acno,
      pswd
    }
     //asynchronous        //url which resolves the login in server//req body,data in the form of json
    return this.http.post('http://localhost:3000/login',data)  //req go to server and server return respnse here,from here reponse is returns to register function in register component.ts that response is result

  
  }
  //register
  register(username:any,acno:any,password:any){
    const data={
      username,
      acno,
      password
    }
    //asynchronous
    return this.http.post('http://localhost:3000/register',data)


  }


deposit(acno:any,password:any,amt:any){
  const data={
    acno,password,amt
  }
  return this.http.post('http://localhost:3000/deposit',data,this.getOptions())

  }  
  
  //appending token to request header
  getOptions(){
    const token = localStorage.getItem('token')
    let headers=new HttpHeaders()  //to create a header,create an object header from httpheader()
    if(token){  //check token there
      headers=headers.append('x-access-token',token)  //appending token on header--token in x-access-token is put in header
      options.headers=headers     //option have header,the header here is added to header in options,then only headers can pass through http request,function overloading is happening there
    }
    return options
  }
  
  withdraw(acno:any,password:any,amt:any){
    const data={
      acno,password,amt
    }
    return this.http.post('http://localhost:3000/withdraw',data,this.getOptions())
  
  
        
  } 
  
  getTransaction(acno:any){
    const data={
      acno
    }
    return this.http.post('http://localhost:3000/transaction',data,this.getOptions())


  }
  

  // to delete account  --dashboard deleteacc
  deleteAcc(acno:any){
    return this.http.delete('http://localhost:3000/deleteAcc/'+acno,this.getOptions())
  }

  
}


  


