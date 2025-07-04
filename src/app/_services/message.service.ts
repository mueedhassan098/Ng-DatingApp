import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';
import { getPaginatedResult, getPaginationHeaders } from './paginationHealper';
import { Member } from '../_models/member';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl=environment.apiUrl;

  constructor(private http:HttpClient) { }

  ngOnInit():void{}

  getMessages(pageNumber:number, pageSize:number, container:string){
    let params=getPaginationHeaders (pageNumber,pageSize);
    params=params.append('Container',container);
    return getPaginatedResult<Message[]>(this.baseUrl + 'messages',params, this.http);    
  }

  messageThread(username:string){
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username)
  }

  sendMessage(username:string, content:string){
    return this.http.post<Message>(this.baseUrl + 'messages', {recipientUsername:username, content})
  }

  deleteMesage(id:number){
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
