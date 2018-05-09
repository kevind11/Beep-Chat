import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth : AuthProvider) {
    this.auth.getAuthenticatedUser().take(1).subscribe(auth =>{
      auth ? this.rootPage = 'TabsPage' : this.rootPage = 'LoginPage'
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#407251');
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

