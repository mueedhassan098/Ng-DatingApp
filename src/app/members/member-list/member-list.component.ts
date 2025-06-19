import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/Pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
//  members$: Observable<Member[]>|undefined;
 members:Member[]=[];
 pagination:Pagination|undefined;
 userparams:UserParams|undefined;

 genderList=[{value:'male',display:'Males'},{value:'female',display:'Females'}]

 constructor(private memberservice:MembersService){
  this.userparams=this.memberservice.getUserParams();
 }

 ngOnInit():void{
  // this.members$=this.memberservice.getMembers();

   this.loadMembers();

 }
 loadMembers(){
  if(this.userparams) {
    this.memberservice.setUserParams(this.userparams);
    this.memberservice.getMembers(this.userparams).subscribe({
      next:response=>{
        if(response.result && response.pagination){
          this.members=response.result;
          this.pagination=response.pagination;
        }
      }
    })
  }
 }

  resetFilter(){
   
      this.userparams=this.memberservice.resetUserParams();
      this.loadMembers();
   
  }

 pageChanged(event:any){
  if(this.userparams&&this.userparams?.pageNumber!==event.page){
    this.userparams.pageNumber=event.page;
    this.memberservice.setUserParams(this.userparams); 
    this.loadMembers();
  }
 }

//  loadMember(){
//   this.memberservice.getMembers().subscribe({
//     next:members=>this.members=members
//   })
//  }
    //  this is using before the observable

}
