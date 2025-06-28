import { Component } from '@angular/core';
import { Message } from '../_models/Message';
import { Pagination } from '../_models/Pagination';
import { MessageService } from '../_services/message.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  messages?:Message[];
  pagination?:Pagination;
  container='Unread';
  pageNumber=1;
  pageSize=5;
  loading=false;
  message:any;

  constructor(private messageService:MessageService, private toastr:ToastrService) { 

  }

  ngOnInit():void{
    this.loadMessages();
  }

  loadMessages(){
    this.loading=true;
     this.messageService.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next:response=>{
        this.messages=response.result;
        this.pagination=response.pagination;
        this.loading=false;
      }
    })
  }

  // deleteMessage(id:number){
  //   this.messageService.deleteMesage(id).subscribe({
  //     next:()=>this.messages?.splice(this.messages.findIndex(m=>m.id===id),1),      
  //   })
  // }
  //deleteMessage(id: number) {
      // const confirmDelete = window.confirm('Are you sure you want to delete this message?');
      //  if (!confirmDelete) return;

  //   this.messageService.deleteMesage(id).subscribe({
  //     next: () => {
  //       const index = this.messages?.findIndex(m => m.id === id);
  //       if (index !== undefined && index > -1) {
  //         this.messages?.splice(index, 1);
  //         this.toastr.success('Message deleted successfully');
  //       }
  //     },
  //     error: () => {
  //       this.toastr.error('Failed to delete message');
  //     }
  // });


  deleteMessage(id: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This message will be deleted permanently.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  }).then(result => {
    if (result.isConfirmed) {
      this.messageService.deleteMesage(id).subscribe({
        next: () => {
          const index = this.messages?.findIndex(m => m.id === id);
          if (index !== undefined && index > -1) {
            this.message=this.messages?.splice(index, 1);
            this.toastr.success('Message deleted successfully');
          }
        },
        error: () => {
          this.toastr.error('Failed to delete message');
        }
      });
    }
  });
}
//}

  pageChanged(event:any){
    if(this.pageNumber!==event.page){
      this.messageService=event.page;
      this.loadMessages();
    }
  }

}
