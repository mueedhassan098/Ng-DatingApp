import { Component, HostListener, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm:NgForm|undefined;
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm?.dirty){
      $event.returnValue=true;
    }
  }
  user:User |null=null;
  member:Member|undefined;

  constructor(private accountService:AccountService,private memberService:MembersService,private toastar:ToastrService){

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next:user=>this.user=user
    })
  }

  ngOnInit():void{
    this.loadMember();
  }


  loadMember(){
    if(!this.user) return;
    this.memberService.getMember(this.user.userName).subscribe({
      next:member=>this.member=member
    })
  }

  updateMember(){
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next:_=>{
        this.toastar.success('Profile updated successfully');
        this.editForm?.reset(this.member);
      }
    })  
  }
}
