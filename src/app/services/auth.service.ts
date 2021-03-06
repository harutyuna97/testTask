import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loggedIn = new BehaviorSubject(false);

  constructor(
    private router: Router
  ) {
    if (!!localStorage.getItem('token')) {
      this.loggedIn.next(true);
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/', 'login']);
    this.loggedIn.next(false);
  }

  login() {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0');
    this.router.navigate(['/']);
    this.loggedIn.next(true);
  }
}
