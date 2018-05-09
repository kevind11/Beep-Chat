import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { DataProvider } from '../../providers/data/data';
import { User } from '@firebase/auth-types';
import { Profile } from '../../models/profile/profile.interface';
declare var cryptico;

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(private data: DataProvider, public navCtrl: NavController, public navParams: NavParams, private toastCtrl: ToastController) {
    console.log(cryptico.generateAESKey());
    // var RSAKey = cryptico.generateRSAKey('HALLO', 512);
    // console.log(RSAKey.e);
    // var PlainText = "Matt, I need you to help me with my Starcraft strategy.";
    // var EncryptionResult = cryptico.encrypt(PlainText, cryptico.publicKeyString(RSAKey));
    // console.log(EncryptionResult);
    // console.log(RSAKey.e);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(event) {
    if (!event.error) {
      this.data.connect();
      this.data.getProfile(event.result as User).subscribe((profile: Profile) => {
        profile ? this.navCtrl.setRoot('TabsPage') 
        : this.navCtrl.setRoot('EditProfilePage') && this.createToast('Welcome to Beep Chat, ' + event.result.email);
      },err =>{
        this.createToast('Failed to login. Please try again');
      });
    }
    else {
      var index = event.error.message.indexOf(':');
      this.createToast(index == -1 ? event.error.message : event.error.message.substr(index + 1));
    }
  }

  private createToast(message) {
    this.toastCtrl.create({
      message: message,
      duration: 2500
    }).present();
  }



}
