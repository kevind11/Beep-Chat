import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Channel } from '../../models/channel/channel.interface';
import { ChatProvider } from '../../providers/chat/chat';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { catchError } from 'rxjs/operators/catchError';


/**
 * Generated class for the ChannelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html',
})
export class ChannelPage {

  channels: Observable<Channel[]>;

  constructor(private alertCtrl: AlertController, private chat: ChatProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.getChannesList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChannelPage');
  }

  addChannel() {
    let alert = this.alertCtrl.create({
      title: 'Add Channel',
      inputs: [
        {
          name: 'channelName',
          placeholder: 'Channel Name'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: data => {
            this.chat.addChannel(data.channelName);
          }
        }
      ]
    });
    alert.present();
  }


  getChannesList() {
    this.channels = this.chat.getChannelsListRef().pipe(
      catchError(error => {
        console.log(error);
        return Observable.of(null);
      })
    );
  }

  openChannelMessage(channel) {
    this.navCtrl.push('ChannelMessagePage', {
      channel: channel
    },{animation: "md-transition", animate: true })
  }




}
