import { Component, OnInit } from '@angular/core';

import { ANM_ROUTE_ENTER, routerTransition } from './router.transition';

@Component({
  selector: 'home',
  animations: [routerTransition],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animateOnRouteEnter = ANM_ROUTE_ENTER; //'route-enter-staggered';
  thisYear = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}
}
