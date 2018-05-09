import { Component, EventEmitter, Output } from '@angular/core';
import { DataProvider } from '../../providers/data/data';
import { Profile } from '../../models/profile/profile.interface';


/**
 * Generated class for the ProfileSearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-profile-search',
  templateUrl: 'profile-search.html'
})
export class ProfileSearchComponent {

  @Output()
  selectedProfile : EventEmitter<Profile>;

  profileList: Profile[];

  constructor(private data: DataProvider) {
    this.selectedProfile = new EventEmitter<Profile>();
  }

  selectProfile(profile){
    this.selectedProfile.emit(profile);
  }
  searchUser(firstName) {
    if (firstName) {
      const trimmedQuery = firstName.trim();
      if (trimmedQuery === firstName) {
        this.data.searchUser(firstName.toLowerCase()).subscribe((profiles) => {
          console.log(profiles);
          this.profileList = <Profile[]>profiles;
        });
      }
    }
  }

}
