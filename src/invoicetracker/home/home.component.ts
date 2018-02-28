import { Component, OnInit } from '@angular/core';

import {
  ANIMATE_ON_ROUTE_ENTER,
  routerTransition
} from '../shared/animations/router.transition';

@Component({
  selector: 'home',
  animations: [routerTransition],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss']
})
export class InvoiceTrackerHomeComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  constructor() {}

  ngOnInit() {}
}
