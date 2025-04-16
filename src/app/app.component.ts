// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DatingApp';
    user:any;
  // constructor(private http:HttpClient,private accountservice:AccountService) {}
  constructor(private accountservice:AccountService) {}
  ngOnInit(): void {
  // this.getUsers();
   this.setCurrentUser();
  }
  // getUsers(){
  //   this.http.get('https://localhost:7197/api/User').subscribe({
  //     next:reponse=>this.user=reponse,
  //     error:error=>console.log(error),
  //     complete:()=>console.log('Request Has Been Completed')
      
  //   });

 // }
  setCurrentUser(){

    const userstring=localStorage.getItem('user');

    if(!userstring) return;
    
    const user:User=JSON.parse(userstring);

    this.accountservice.setCurrentUser(user);
  }

 
}
