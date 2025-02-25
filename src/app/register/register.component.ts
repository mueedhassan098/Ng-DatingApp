import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancleRegister =new EventEmitter();
  model:any={}

  constructor(private accountservice:AccountService,private toastr:ToastrService){}

  ngOnInit():void{}

  register(){
    this.accountservice.register(this.model).subscribe({
      next:()=>{
        this.cancle();
      },
      error:error=>this.toastr.error(error.error)
      
    })
   // console.log(this.model);
  }
  cancle(){
   this.cancleRegister.emit(false);
    //console.log("Cancled");
  }

}
//register component child ha home component 