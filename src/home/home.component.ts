import { Component, OnInit } from '@angular/core';

import { ANIMATE_ON_ROUTE_ENTER, routerTransition } from './router.transition';

@Component({
  selector: 'home',
  animations: [routerTransition],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animateOnRouteEnter = 'route-enter-staggered'; // ANIMATE_ON_ROUTE_ENTER;
  thisYear = new Date().getFullYear();
  constructor() {}

  ngOnInit() {}
}
