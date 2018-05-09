import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

 

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl : ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(event){
    if(!event.error){
      this.createToast('Account created : ' + event.result.email);
    }
    else{
      var index = event.error.message.indexOf(':');
      this.createToast(index == -1 ? event.error.message : event.error.message.substr(event.error.message.indexOf(':') + 1));
    }
  }

  private createToast(message){
    this.toastCtrl.create({
      message : message,
      duration : 2500
    }).present();
  }


 

}
