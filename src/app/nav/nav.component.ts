import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model:any={}

  constructor(public accountservices:AccountService,private router: Router,private toastr:ToastrService ){}

ngOnInit():void{

}

 login(){
  this.accountservices.login(this.model).subscribe({
   next:()=>this.router.navigateByUrl('/members'),
    error:error=>this.toastr.error(error.error)      
     // this.loggedIn=true;  //purana sub and unsub   
     
 });
    //console.log(this.model);
}
logout(){
  this.accountservices.logout();
  this.router.navigateByUrl('/');
   //this.loggedIn=false; //pura tarika manul wala
}
}
