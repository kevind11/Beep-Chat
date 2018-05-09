import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Channel } from '../../models/channel/channel.interface';
import { ChannelMessage } from '../../models/channel-message/channel-message.interface';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../models/message/message.interface';
import { Profile } from '../../models/profile/profile.interface';


/*
  Generated class for the ChatProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ChatProvider {

  constructor(public database: AngularFireDatabase) {

  }

  async addChannel(channelName: string) {
    await this.database.list('/channels-list').push({ name: channelName });
  
  }

  getChannelsListRef() {
    return this.database.list('/channels-list').snapshotChanges().map(values => {
      return values.map(value => {
        return <Channel>{
          name: value.payload.child('name').exists() ? value.payload.child('name').val() : '',
          key: value.key
        }
      })
    });
  }

  getChannelMessages(channelKey) {
    return <Observable<ChannelMessage[]>> this.database.list('/channels-messages/' + channelKey).valueChanges();
  }
  getUserMessages(key) {
    return <Observable<Message[]>> this.database.list('/user-messages/' + key).valueChanges();
  }

  getChannelMessageKey(){
    return this.database.list('/channels-list').push({}).key;
  }
  getUserMessageKey(key){
    return this.database.list('/user-messages/' + key).push({}).key;
  }

  async sendMessageToUser(uid, key, message: Message, friendProfile : Profile) {
    message.key = this.getUserMessageKey(key);
    var lastMessageMe = Object.assign({}, message);
    lastMessageMe.user = friendProfile;
    var updates = {};
    updates['user-messages/' + key + '/' + message.key] = message;
    updates['last-messages/' + uid + '/' + key] = lastMessageMe;
    updates['last-messages/' + friendProfile.uid + '/' + key] = message;
    await this.database.object('/').update(updates);
  }

  async sendMessageToChannel(channelKey, channelMessage: ChannelMessage) {
    channelMessage.key = this.getChannelMessageKey();
    await this.database.list('/channels-messages/' + channelKey).push(channelMessage);
  }

  getLastMessages(uid){
    return <Observable<Message[]>> this.database.list('/last-messages/' + uid).valueChanges();
  }

}
