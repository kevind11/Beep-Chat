import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Profile } from '../../models/profile/profile.interface';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  existingProfile : Profile;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.existingProfile = this.navParams.get('existingProfile');
  }

  saveProfileResult(event){
    event ? this.navCtrl.length() != 2 ? this.navCtrl.setRoot('TabsPage') : this.navCtrl.setRoot('ProfilePage'): console.log("Not authenticated or saved");
  }

  

}
