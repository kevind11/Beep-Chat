import { Component, EventEmitter, Output} from '@angular/core';


/**
 * Generated class for the SendMessageBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-send-message-box',
  templateUrl: 'send-message-box.html'
})
export class SendMessageBoxComponent {

  @Output()
  resize: EventEmitter<Boolean>;

  @Output()
  sendMessage: EventEmitter<string>;

  message : string;

  constructor() {
    this.resize = new EventEmitter<Boolean>();
    this.sendMessage = new EventEmitter<string>();
  }

  contentResize(resize) {
    this.resize.emit(true);
  }

  send(){
    this.sendMessage.emit(this.message);
    this.message = null;
  }
}
