import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {ILoginInterface} from '../interfaces/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginError = false;

  staticLoginInfo: ILoginInterface = {email: 'test@mail.com', password: 'testtest'};

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  submit() {
    if (this.loginForm.invalid) {
      return alert('Please fill out all fields with correct format');
    }
    if (
      this.loginForm.get('email').value === this.staticLoginInfo.email
      &&
      this.loginForm.get('password').value === this.staticLoginInfo.password
    ) {
      this.authService.login();
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }
}
