import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member:Member|undefined;

  constructor(private memberservice:MembersService, private toastr:ToastrService){}

  ngOnInit():void{}

  addlikes(member:Member){
    this.memberservice.addlikes(member.userName).subscribe({
      next:()=>this.toastr.success(' You have liked ' +  member.knownAs)
    });
  }
}
