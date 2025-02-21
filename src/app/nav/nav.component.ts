import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model:any={}

  constructor(public accountservices:AccountService ){}

ngOnInit():void{

}

 login(){
  this.accountservices.login(this.model).subscribe({
   next:responce=>{
     console.log(responce);
     // this.loggedIn=true;  //purana sub and unsub
   },
   error:error=>console.log(error)       
 });
 console.log(this.model);
}
logout(){
  this.accountservices.logout();
   //this.loggedIn=false; //pura tarika manul wala
}
}
