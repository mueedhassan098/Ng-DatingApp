import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode=false;
  user:any;
  constructor(private http:HttpClient) {
    
  }
  ngOnInit():void{
    this.getUsers();
  }
  RgisterToggle(){
  this.registerMode=!this.registerMode; 
  }
  getUsers(){
    this.http.get('https://localhost:7197/api/User').subscribe({
      next:reponse=>this.user=reponse,
      error:error=>console.log(error),
      complete:()=>console.log('Request Has Been Completed')
    });
  }
  cancleRegistration(event:boolean){
    this.registerMode=event;
  }

}
