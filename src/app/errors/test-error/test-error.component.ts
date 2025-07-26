import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css']
})
export class TestErrorComponent {
  baseUrl=environment.apiUrl;
  validationError :string[]=[];

  constructor(private httpclient:HttpClient){ }

  ngOnInit():void{
  }

  get400Error(){
    this.httpclient.get(this.baseUrl+'buggy/bad-request').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get400ValidationError(){
    this.httpclient.post(this.baseUrl+'account/register',{}).subscribe({
      next:response=>console.log(response),
      error:error=>{
        console.log(error)
        this.validationError=error;
      }
    })
  }
  get401Error(){
    this.httpclient.get(this.baseUrl+'buggy/auth').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get404Error(){
    this.httpclient.get(this.baseUrl+'buggy/not-found').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }

  get500Error(){
    this.httpclient.get(this.baseUrl+'buggy/server-error').subscribe({
      next:response=>console.log(response),
      error:error=>console.log(error)
    })
  }
}
