import { Component,Input, Output,EventEmitter } from '@angular/core';
import { Message } from '../../models/message/message.interface';
import { Profile } from '../../models/profile/profile.interface';


/**
 * Generated class for the LastMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-last-message',
  templateUrl: 'last-message.html'
})
export class LastMessageComponent {

  @Input()
  message : Message;

  @Output()
  chat : EventEmitter<Profile>;
  constructor() {
    this.chat = new EventEmitter<Profile>();
  }

  openChat(){
    this.chat.emit(this.message.user);
  }

 


}
