import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducer';

import { User } from '../../models/user.model';

export const getUserState = createSelector(
  fromFeature.getInvoiceTrackerState,
  (state: fromFeature.InvoiceTrackerState) => state.user
);

export const getUser = createSelector(getUserState, fromUser.getUser);

export const getUserUid = createSelector(getUserState, fromUser.getUserUid);

export const getUserDisplayName = createSelector(
  getUserState,
  fromUser.getUserDisplayName
);

export const getUserLoggedIn = createSelector(
  getUserState,
  fromUser.getUserLoggedIn
);

export const getUserLoaded = createSelector(
  getUserState,
  fromUser.getUserLoaded
);

export const getUserLoading = createSelector(
  getUserState,
  fromUser.getUserLoading
);
export const getUserError = createSelector(getUserState, fromUser.getUserError);
