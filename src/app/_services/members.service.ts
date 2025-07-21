import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';
import { getPaginatedResult, getPaginationHeaders } from './paginationHealper';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl=environment.apiUrl;
  members:Member[]=[];
  memberCache=new Map();
  user:User|undefined;
  userParams:UserParams|undefined;
  

  constructor(private http:HttpClient,private accountService:AccountService) {
     this.accountService.currentUser$.pipe(take(1)).subscribe({
    next:user=>{
      if(user){
        this.userParams=new UserParams(user);
        this.user=user;
      }
    }
  })
  }
  addlikes(username:string){
    return this.http.post(this.baseUrl + 'likes/' + username, {});
  }

  getLikes(predicate:string, pageSize:number, pageNumber:number){
    let params=getPaginationHeaders(pageNumber,pageSize);
    params=params.append('predicate', predicate);
    return getPaginatedResult<Member[]>(this.baseUrl + 'likes', params,this.http);
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params:UserParams){
    this.userParams=params;
  }

  resetUserParams(){
    if(this.user){
        this.userParams=new UserParams(this.user);
        return this.userParams;
    }
    return;
  }


  getMembers(userParams:UserParams){
    const response=this.memberCache.get(Object.values(userParams).join('-'));
    if(response)  return of(response);
    let params = getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
    params=params.append('minAge',userParams.minAge);
    params=params.append('maxAge',userParams.maxAge);
    params=params.append('gender',userParams.gender);
    params=params.append('orderBy',userParams.orderBy);


    return getPaginatedResult<Member[]>(this.baseUrl+'user', params,this.http).pipe(
      map(response => {
        this.memberCache.set(Object.values(userParams).join('-'),response);
        return response;
      })
    )
  }

  
  getMember(username:string){
    // const member=this.members.find(x=>x.userName===username);
    // if(member) return of(member);
    const member=[...this.memberCache.values()].reduce((arr,elm)=>arr.concat(elm.result),[])
    .find((member:Member)=>member.userName===username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl+'user/' + username);

  }

  updateMember(member:Member){
    return this.http.put(this.baseUrl+'user',member).pipe(
      map(()=>{
        const index=this.members.indexOf(member);
        this.members[index]={...this.members[index], ...member}
      })
    )
  }

  setMainPhoto(photoId:number){
    return this.http.put(this.baseUrl+'user/set-main-photo/'+photoId,{});

  }


  deletePhoto(photoId:number){
    return this.http.delete(this.baseUrl+'user/delete-photo/'+photoId);
  }

 


  //this method is using after creating jwt interceptor

  // getHttpOption(){
  //   const userString=localStorage.getItem('user');
  //   if(!userString) return;
  //   const user=JSON.parse(userString);
  //   return{
  //     headers:new HttpHeaders({
  //       Authorization:'Bearer '+user.token
  //     })
  //   }
  // }
}
