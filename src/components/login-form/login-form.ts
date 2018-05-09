import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Account } from '../../models/account/account.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the LoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-login-form',
  templateUrl: 'login-form.html'
})
export class LoginFormComponent {

  @Output()
  loginStatus : EventEmitter<any>;

  loginForm : FormGroup;
  
  account = {} as Account;

  constructor(private navCtrl: NavController, private auth: AuthProvider, private formBuilder : FormBuilder) {
    this.loginStatus = new EventEmitter<any>();
    this.loginForm = this.formBuilder.group({
      email :['', [Validators.required, Validators.email]],
      password :['',[Validators.required, Validators.pattern('(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$')]]
    });
  }

  async login() {
    this.account = this.loginForm.value;
    const result = await this.auth.signInWithEmailAndPassword(this.account);
    this.loginStatus.emit(result);
  }

  navigateToRegisterPage(page) {
   this.navCtrl.push('RegisterPage');
  }

}
