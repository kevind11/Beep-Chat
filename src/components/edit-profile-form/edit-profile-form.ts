import { Component,EventEmitter, Output,Input, OnInit } from '@angular/core';
import { Profile } from '../../models/profile/profile.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { DataProvider } from '../../providers/data/data';
import { Subscription } from 'rxjs/Subscription';
import { User } from '@firebase/auth-types';


/**
 * Generated class for the EditProfileFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-edit-profile-form',
  templateUrl: 'edit-profile-form.html'
})
export class EditProfileFormComponent implements OnInit {

  @Output()
  saveProfileResult : EventEmitter<Boolean>;

  @Input()
  profile : Profile;

  authenticatedUser$: Subscription;
  authenticatedUser: User;
 

  constructor(private auth: AuthProvider, private data: DataProvider) {
    this.saveProfileResult = new EventEmitter<Boolean>();
    this.authenticatedUser$ = this.auth.getAuthenticatedUser().subscribe((user: User) => {
        this.authenticatedUser = user;
    });
  }

  ngOnInit(){
    if(!this.profile){
      this.profile = {} as Profile;
    }
  }

  async saveProfile() {
    if(this.authenticatedUser){
      this.profile.email = this.authenticatedUser.email;
      this.profile.uid = this.authenticatedUser.uid;
      const result = await this.data.saveProfile(this.authenticatedUser, this.profile);
      this.saveProfileResult.emit(result);
    }
  }

  ionViewDidUnload(){
    this.authenticatedUser$.unsubscribe();
  }

}
