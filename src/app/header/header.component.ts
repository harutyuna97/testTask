import {Component, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnDestroy {

  loggedIn = false;

  alive$: Subject<any> = new Subject<any>();

  constructor(
    private authService: AuthService
  ) {
    this.authService.loggedIn.pipe(takeUntil(this.alive$)).subscribe(data => {
      this.loggedIn = data;
    });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.alive$.next();
    this.alive$.complete();
  }
}
