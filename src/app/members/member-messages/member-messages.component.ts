import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/Message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent {
  @ViewChild('messageForm') messsageForm?:NgForm;
  @Input() username?:string;
  @Input() messages:Message[]=[];
  messageContent='';

  constructor(private messageService:MessageService){}

  ngOnInit():void{
    
  }

  sendMessage(){
    if(!this.username) return;
    this.messageService.sendMessage(this.username, this.messageContent).subscribe({
      next:message=>{
        this.messages.push(message);
        this.messsageForm?.reset();
      }
    })
  }
  

}
