import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events } from 'ionic-angular';
import { MESSAGE_LIST } from '../../mocks/messages/messages';
import { Subscription } from 'rxjs/Subscription';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ChatProvider } from '../../providers/chat/chat';
import { Observable } from 'rxjs/Observable';
import { Message } from '../../models/message/message.interface';
import { catchError } from 'rxjs/operators/catchError';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the InboxPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html',
})
export class InboxPage {

  messages = MESSAGE_LIST;

  authProfile$: Subscription;
  isFromLogout : boolean = false;
  onlineStatus$ : Subscription;
  endFetchUser: boolean = false;
  lastMessages: Observable<Message[]>;

  constructor(private event : Events, private data: DataProvider, private app: App, private navCtrl: NavController, public navParams: NavParams, private auth: AuthProvider, private chat: ChatProvider, private alertCtrl: AlertController) {
    this.event.subscribe('logout', (value) =>{
      this.isFromLogout = true;
    })
    this.authProfile$ = this.auth.getAuthenticatedUser().subscribe((user) => {
      if (user && !this.endFetchUser) {
        this.onlineStatus(user.uid);
        this.getLastMessages(user.uid);

      }
      else if (!user) {
        if(!this.isFromLogout)
        this.alertLogout();
        this.data.disconnect();
      }
      this.endFetchUser = true;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InboxPage');
  }
  ionViewWillUnload() {
    this.event.unsubscribe('logout');
    this.authProfile$.unsubscribe();
    this.onlineStatus$.unsubscribe();
  }

  navigateToSearchUserPage() {
    this.navCtrl.push('SearchUserPage');
  }

  getLastMessages(uid) {
    this.lastMessages = this.chat.getLastMessages(uid).pipe(catchError(error => {
      return Observable.of([]);
    }));
  }
  messageIdentify(index, item: Message) {
    return item.key;
  }

  alertLogout() {
    let alert = this.alertCtrl.create({
      title: 'Information',
      message: 'Please try to Login again.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.app.getRootNavs()[0].setRoot('LoginPage');
          }
        }
      ]
    });
    alert.present();
  }

  openChat(profile) {
    this.navCtrl.push('MessagePage', {
      profile: profile
    }, { animation: "md-transition", animate: true })
  }


  onlineStatus(uid) {
    this.onlineStatus$ = this.data.onlineStatus().subscribe(value =>{
      if(value){
        this.data.setOnline(uid);
      }
    })
  }

}
