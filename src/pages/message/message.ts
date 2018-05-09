import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content,Navbar } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { DataProvider } from '../../providers/data/data';
import { ChatProvider } from '../../providers/chat/chat';
import { Message } from '../../models/message/message.interface';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import moment from 'moment';

/**
 * Generated class for the MessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  @ViewChild(Content)
  content: Content;

  @ViewChild(Navbar)
  navBar: Navbar;

  message = {} as Message; 
  friendProfile : Profile;
  profile: Profile;
  authProfile$: Subscription;
  friendProfile$ : Subscription;
  previousDate : number;
  ourKey : string;
  isOnline : boolean = false;
  isLoading : boolean = true;

  messages : Observable<Message[]>;
  endFetchProfile : boolean = false;

  constructor(private data: DataProvider, private chat: ChatProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.friendProfile = this.navParams.get('profile');
    this.friendProfile$ = this.data.friendOnlineStatus(this.friendProfile.uid).subscribe(value =>{
      this.isLoading = false;
      value ? this.isOnline = true : this.isOnline = false;
    });
    this.authProfile$ = this.data.getAuthenticatedUserProfile().map(profile => {
      profile.searchFirstName = null;
      profile.dateOfBirth = null;
      profile.email = null;
      return profile;
    }).subscribe(profile => {
      this.ourKey = profile.uid < this.friendProfile.uid ? profile.uid + '_' + this.friendProfile.uid  : this.friendProfile.uid + '_' + profile.uid; 
      this.profile = profile;
      if(this.profile && !this.endFetchProfile){
        this.getMessages();
      }
      this.endFetchProfile = true;
    });
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
    this.friendProfile$.unsubscribe();
  }

  getMessages() {
    this.messages = this.chat.getUserMessages(this.ourKey).pipe(catchError(error =>{
      return Observable.of([]);
    }));
  }

  messageIdentify(index, item : Message){
    return item.key;
  }

  sendMessage(message) {
    if (this.profile) {
      this.message.user = this.profile;
      this.message.date = new Date().getTime();
      this.message.message = message;
      this.chat.sendMessageToUser(this.profile.uid, this.ourKey, this.message, this.friendProfile);
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