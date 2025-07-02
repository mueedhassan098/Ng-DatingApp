import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  BaseUrl=environment.apiUrl;
  private currentusersource=new BehaviorSubject<User | null >(null);
  currentUser$=this.currentusersource.asObservable();

  constructor(private http:HttpClient) { }


  login(model:any){
    return this.http.post<User>(this.BaseUrl+'account/login',model).pipe(
      map((response: User )=>{    
      const user= response;
      if(user){
        this.setCurrentUser(user);  
       }
      }) 
    )
  }


  register(model:any){
    return this.http.post<User>(this.BaseUrl+'account/register',model).pipe(
      map(user=>{
        if(user){
         this.setCurrentUser(user);
        }
      })
    )
  }


  setCurrentUser(user:User){
    user.roles=[];
    const roles=this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user',JSON.stringify(user));
    this.currentusersource.next(user);
  }


  logout(){
    localStorage.removeItem('user');
    this.currentusersource.next(null);
  }

  getDecodedToken(token:string){
    return JSON.parse(atob(token.split('.')[1]))
  }













}
