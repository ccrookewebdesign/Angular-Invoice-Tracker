import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../../app/store';

import { ANM_ROUTE_ENTER, routerTransition } from './router.transition';

@Component({
  selector: 'app-root',
  animations: [routerTransition],
  template: `
  <div class="container" class="routercontainer" 
    [@routerTransition]="o.isActivated && o.activatedRoute.routeConfig.path">
    <router-outlet #o="outlet"></router-outlet>
  </div>
  `
})
export class AppComponent implements OnInit {
  animateOnRouteEnter = ANM_ROUTE_ENTER;

  constructor(private router: Store<fromRoot.State>) {}

  ngOnInit() {}
}
