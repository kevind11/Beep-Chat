import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { User } from '@firebase/auth-types';
import { Profile } from '../../models/profile/profile.interface';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/mergeMap';
import { AuthProvider } from '../auth/auth';
import firebase from 'firebase';
/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  profileObject: AngularFireObject<Profile>;

  constructor(private auth : AuthProvider, private database: AngularFireDatabase) {

  }
  searchUser(firstName : string){
    const query = this.database.list('/profiles',ref => ref.orderByChild('searchFirstName').startAt(firstName).endAt(firstName + '\uf8ff'));
    return query.valueChanges().take(1);
  }
  getProfile(user : User){
    this.profileObject = this.database.object('/profiles/' + user.uid);
    return this.profileObject.valueChanges().take(1);
  }
  async saveProfile(user: User, profile: Profile) {
    var profileDatabase = <any>profile;
    profileDatabase.searchFirstName = profileDatabase.firstName.toLowerCase();
    this.profileObject = this.database.object('/profiles/' + user.uid);
    try {
      await this.profileObject.set(profileDatabase);
      return true;
    }
    catch (e) {
      console.error(e);
      return false;
    }
  }

  getAuthenticatedUserProfile(){
    return this.auth.getAuthenticatedUser().mergeMap(user =>{
      return this.getProfile(user).map(profile =>{
        return profile;
      });
    })
  }

  onlineStatus(){
    return this.database.object('.info/connected').valueChanges();
  }
   setOnline(uid){
    var con = firebase.database().ref('online-users').child(uid).push();
    con.onDisconnect().remove();
    con.set(true);
  }

  friendOnlineStatus(uid){
    return this.database.object('online-users/' + uid).valueChanges();
    
  }

  disconnect(){
    firebase.database().goOffline();
  }
  connect(){
    firebase.database().goOnline();
  }

}
