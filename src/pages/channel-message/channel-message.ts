import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Navbar } from 'ionic-angular';
import { Channel } from '../../models/channel/channel.interface';
import { ChatProvider } from '../../providers/chat/chat';
import { Observable } from 'rxjs/Observable';
import { ChannelMessage } from '../../models/channel-message/channel-message.interface';
import { DataProvider } from '../../providers/data/data';
import { Subscription } from 'rxjs/Subscription';
import { Profile } from '../../models/profile/profile.interface';
import { catchError } from 'rxjs/operators/catchError';
import moment from 'moment';

/**
 * Generated class for the ChannelMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel-message',
  templateUrl: 'channel-message.html',
})
export class ChannelMessagePage {

  @ViewChild(Content)
  content: Content;

  @ViewChild(Navbar)
  navBar: Navbar;

  channel: Channel;
  message = {} as ChannelMessage;
  profile: Profile;
  authProfile$: Subscription;
  previousDate : number;
  endFetchProfile = false;


  channelMessages: Observable<ChannelMessage[]>;

  constructor(private data: DataProvider, private chat: ChatProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.authProfile$ = this.data.getAuthenticatedUserProfile().map(profile => {
      profile.searchFirstName = null;
      profile.dateOfBirth = null;
      profile.email = null;
      return profile;
    }).subscribe(profile => {
      this.profile = profile;
      console.log(this.profile);
      if(this.profile && !this.endFetchProfile){
        this.getChannelMessages();
      }
      this.endFetchProfile = true;
    });
    this.channel = this.navParams.get('channel');
    this.getChannelMessages();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = () => {
      //Write here wherever you wanna do
      this.navCtrl.pop({ animation: "md-transition", animate: true });
    }
    console.log('ionViewDidLoad ChannelMessagePage');
  }

  contentResize(resize) {
    this.content.resize();
  }

  scrollBottom(){
    this.content.scrollToBottom(0);
  }

  ionViewWillLeave(){
    this.authProfile$.unsubscribe();
  }

  getChannelMessages() {
    this.channelMessages = this.chat.getChannelMessages(this.channel.key).pipe(catchError(error => {
      return Observable.of([]);
    }));
  }

  messageIdentify(index, item : ChannelMessage){
    return item.key;
  }

  sendMessage(message) {
    if (this.profile) {
      this.message.user = this.profile;
      this.message.date = new Date().getTime();
      this.message.message = message;
      this.chat.sendMessageToChannel(this.channel.key, this.message);
    }
  }
  needDateHeader(index, messageDate : number){
    var val = false;
    if(index == 0){
      val  = true;
    }
    else if(!moment(messageDate).isSame(moment(this.previousDate),'day')){
      val = true;
    }
    this.previousDate = messageDate;
    return val;
  }
}
