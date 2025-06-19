import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { Member } from '../_models/member';
import { map, of, take } from 'rxjs';
import { PaginatedResult } from '../_models/Pagination';
import { UserParams } from '../_models/userParams';
import { AccountService } from './account.service';
import { User } from '../_models/user';

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
    let params = this.getPaginationHeaders(userParams.pageNumber,userParams.pageSize);
    params=params.append('minAge',userParams.minAge);
    params=params.append('maxAge',userParams.maxAge);
    params=params.append('gender',userParams.gender);
    params=params.append('orderBy',userParams.orderBy);


    return this.getPaginatedResult<Member[]>(this.baseUrl+'user', params).pipe(
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
    return this.http.get<Member>(this.baseUrl+'user/'+username);

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

  private getPaginatedResult<T>(url:string, params: HttpParams) {
    const paginatedResult:PaginatedResult<T>=new PaginatedResult<T>;
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginatedResult.result = response.body;
        }
        const pagination = response.headers.get('pagination');
        if (pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }
        return paginatedResult;
      })
    );
  }

  private getPaginationHeaders(pageNumber:number, pageSize:number) {
    let params = new HttpParams();    
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);    
    return params;
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
