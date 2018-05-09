import { Component, EventEmitter, Output } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { OnInit, OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Profile } from '../../models/profile/profile.interface';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the ProfileViewComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewComponent implements OnInit,OnDestroy {

  @Output()
  existingProfile: EventEmitter<Profile>

  loader: Loading;
  userProfile: Profile;
  authUserProfile$ : Subscription;

  constructor(private loadingCtrl: LoadingController, private data: DataProvider) {
    this.existingProfile = new EventEmitter<Profile>();
    this.loader = this.loadingCtrl.create({
      content: 'Loading Profile',
    });
  }

  ngOnInit() {
    this.loader.present().then(() => {
       this.authUserProfile$ = this.data.getAuthenticatedUserProfile().subscribe((profile: Profile) => {
        this.userProfile = profile;
        this.existingProfile.emit(this.userProfile);
        this.loader.dismiss();
      }, err => {
        console.log(err);
        this.loader.dismiss();
      });
    });
  }

  ngOnDestroy(){
    this.authUserProfile$.unsubscribe();
  }

}
