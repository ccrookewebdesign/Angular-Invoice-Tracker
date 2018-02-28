import * as userActions from '../actions/user.action';
import { User } from '../../models/user.model';

export interface UserState {
  uid: string;
  displayName: string;
  loggedIn: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

export const initialState: UserState = {
  uid: null,
  displayName: 'GUEST',
  loggedIn: false,
  loading: false,
  loaded: false,
  error: ''
};

export function reducer(
  state = initialState,
  action: userActions.UserAction
): UserState {
  switch (action.type) {
    case userActions.GET_USER:
      return { ...state, loading: true };

    case userActions.AUTHENTICATED:
      return {
        ...state,
        ...action.payload,
        loggedIn: true,
        loaded: true,
        loading: false
      };

    case userActions.NOT_AUTHENTICATED:
      return { ...state, ...initialState, loggedIn: false, loaded: true };

    case userActions.GOOGLE_LOGIN:
      return { ...state, loading: true };

    case userActions.AUTH_ERROR:
      return {
        ...state,
        ...action.payload,
        loggedIn: false,
        loaded: false,
        loading: false
      };

    case userActions.LOGOUT:
      return { ...state, loggedIn: false, loading: true, loaded: false };
  }

  return state;
}

export const getUser = (state: UserState) => state;
export const getUserUid = (state: UserState) => state.uid;
export const getUserDisplayName = (state: UserState) => state.displayName;
export const getUserLoggedIn = (state: UserState) => state.loggedIn;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUserError = (state: UserState) => state.error;
