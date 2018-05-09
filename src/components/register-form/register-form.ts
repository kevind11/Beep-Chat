import { Component, EventEmitter, Output } from '@angular/core';
import { Account } from '../../models/account/account.interface';
import { LoginResponse } from '../../models/login/login.response.interface';
import { AuthProvider } from '../../providers/auth/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the RegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-register-form',
  templateUrl: 'register-form.html'
})
export class RegisterFormComponent {

  @Output()
  registerStatus : EventEmitter<LoginResponse>;

  registerForm : FormGroup;

  account = {} as Account;

  constructor(private auth : AuthProvider, private formBuilder : FormBuilder) {
      this.registerStatus = new EventEmitter<LoginResponse>();
      this.registerForm = this.formBuilder.group({
        email :['', [Validators.required, Validators.email]],
        password :['',[Validators.required, Validators.pattern('(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,20}$')]]
      });
  }

  async register() {
    this.account = this.registerForm.value;
    const result = await this.auth.createUserWithEmailAndPassword(this.account);
    this.registerStatus.emit(result);
  }

  
}
