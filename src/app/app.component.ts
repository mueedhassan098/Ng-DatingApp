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
  setCurrentUser(){

    const userstring=localStorage.getItem('user');

    if(!userstring) return;
    
    const user:User=JSON.parse(userstring);

    this.accountservice.setCurrentUser(user);
  }

 
}
