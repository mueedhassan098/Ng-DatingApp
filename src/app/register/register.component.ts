import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() CancleRegister =new EventEmitter();
  model:any={}

  constructor(private accountservice:AccountService){}

  ngOnInit():void{}

  register(){
    this.accountservice.register(this.model).subscribe({
      next:()=>{
        this.cancle();
      },
      error:error=>console.log(error)
      
    })
   // console.log(this.model);
  }
  cancle(){
   this.CancleRegister.emit(false);
    //console.log("Cancled");
  }

}
//register component child ha home component 