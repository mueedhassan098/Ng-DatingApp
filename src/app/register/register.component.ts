import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  @Output() cancleRegister =new EventEmitter();
  registerForm:FormGroup=new FormGroup({});
  maxDate:Date=new Date();
  validationErrors:string|undefined;

  constructor(private accountservice:AccountService,private toastr:ToastrService,private fb:FormBuilder,private router:Router){}

  ngOnInit():void{
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm(){
    this.registerForm=this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,
        Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',[Validators.required,this.matchValue('password')]],
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValue(matchTo:string):ValidatorFn{
    return(control:AbstractControl)=>{
      return control.value===control.parent?.get(matchTo)?.value ? null:{noMatching:true}
    }
  }

  register(){
    const dob=this.getDateOnly(this.registerForm.controls['dateOfBirth'].value);
    const values={...this.registerForm.value, dateOfBirth:dob};  
    this.accountservice.register(values).subscribe({
      next:()=>{
        this.router.navigateByUrl('/members')
      },
      error:error=>{
       this.validationErrors=error
      }
    })
    console.log(this.registerForm.value);
  }
  cancle(){
   this.cancleRegister.emit(false);
  }
  private getDateOnly(dob:string|undefined){
    if(!dob) return; 
    let theDob=new Date(dob);
    return new Date(theDob.setMinutes(theDob.getMinutes()-theDob.getTimezoneOffset())).toISOString().slice(0,10);

  }

}
//register component child ha home component 