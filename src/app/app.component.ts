import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MatDialog } from '@angular/material';
import { ChildComponent } from './child/child.component';
import { fadeAnimation } from './animations';

@Component({
    selector: 'app-my-app',
    templateUrl: './app.component.html',
    animations: [fadeAnimation]
})

export class AppComponent implements OnInit {
  private _router: Subscription;

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
}

  constructor( private router: Router, private dig: MatDialog) {
  }
    ngOnInit() {
      this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName('body')[0];
        const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
        if (body.classList.contains('modal-open')) {
          body.classList.remove('modal-open');
          modalBackdrop.remove();
        }
      });
    }
}
