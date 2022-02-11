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
    localStorage.setItem('token', 'sajdhisaudhis515151545sd5s4da5dasdsad');
    this.router.navigate(['/']);
    this.loggedIn.next(true);
  }
}
