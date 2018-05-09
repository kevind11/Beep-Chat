import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { App } from 'ionic-angular/components/app/app';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  existingProfile : Profile;

  constructor(private event : Events, private auth : AuthProvider, private navCtrl: NavController, public navParams: NavParams, private appCtrl : App) {
  
  }

  getExistingProfile(profile : Profile){
    this.existingProfile = profile;
  }

  navigateToEditProfilePage(){
    this.navCtrl.push('EditProfilePage', {
      existingProfile : this.existingProfile
    });
  }

  signOut(){
    this.event.publish('logout',true);
    this.auth.signOut();
    this.appCtrl.getRootNavs()[0].setRoot('LoginPage');
  }

}
