import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent {
 members$: Observable<Member[]>|undefined;

 constructor(private memberservice:MembersService)
 {

 }
 ngOnInit():void{
  this.members$=this.memberservice.getMembers();
  // this.loadMember();

 }

//  loadMember(){
//   this.memberservice.getMembers().subscribe({
//     next:members=>this.members=members
//   })
//  }
    //  this is using before the observable

}
