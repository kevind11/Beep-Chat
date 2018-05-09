import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchUserPage');
  }

  openChat(profile){
    profile.searchFirstName = null;
    profile.dateOfBirth = null;
    profile.email = null;
    this.navCtrl.push('MessagePage', {
      profile : profile
    },{animation: "md-transition", animate: true }).then(() =>{
      this.navCtrl.length() === 3 ? this.navCtrl.remove(1) : '';
    });
    
  }

}
