import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/Message';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent {
  @ViewChild('memberTabs', {static:true}) memberTabs?:TabsetComponent;
  member:Member ={} as Member;
  galleryOptions:NgxGalleryOptions[]=[];
  galleryImages:NgxGalleryImage[]=[];
  activeTab?:TabDirective;
  messages:Message[]=[];


  constructor(private memberService:MembersService,private route:ActivatedRoute, private messageService:MessageService){}
  ngOnInit():void{
    this.route.data.subscribe({
      next:data=>this.member=data['member']
    })

    this.route.queryParams.subscribe({
      next:params=>{
        params['tab'] && this.selectTab(params['tab'])
      }
    })
    this.galleryOptions=[
      {
        width:'500px',
        height:'500px',
        imagePercent:100,
        thumbnailsColumns:4,
        imageAnimation:NgxGalleryAnimation.Slide,
        preview:false
      }
    ] 
        this.galleryImages=this.getImages();
   

  }
  getImages(){
    if(!this.member) return[];
    const imageUrls =[];
    for(const photo of this.member.photos){
      imageUrls.push({
        small:photo.url,
        medium:photo.url,
        big:photo.url
      })
    }
    return imageUrls;

  }

  // loadMember(){
  //   const username=this.route.snapshot.paramMap.get('username');
  //   if(!username) return;
  //   this.memberService.getMember(username).subscribe({
  //     next:member=>{
  //       this.member=member;
  //     }
  //   })
  // }

  loadMessages(){
    if(this.member){
      this.messageService.messageThread(this.member.userName).subscribe({
        next:messages=>{
          this.messages =messages;
        }
      })
    }
  }

  onTabActivated(data:TabDirective){
    this.activeTab=data;
    if(this.activeTab.heading==='Messages'){
      this.loadMessages();
    }
  }

  selectTab(heading:string){
    if(this.memberTabs){    
      this.memberTabs.tabs.find(x=>x.heading === heading)!.active=true
    }
  }
}
