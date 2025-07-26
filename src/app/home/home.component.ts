import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  registerMode=false;
  user:any;
  // constructor(private http:HttpClient) {
    
  // }
  constructor() {
    
  }
  ngOnInit():void{
    // this.getUsers();
  }
  RgisterToggle(){
  this.registerMode=!this.registerMode; 
  }
  cancleRegistration(event:boolean){
    this.registerMode=event;
  }

}
