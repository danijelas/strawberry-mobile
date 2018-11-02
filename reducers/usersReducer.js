import {
  SESSION_EMAIL_KEY,
  SESSION_TOKEN_KEY,
  FETCH_PROFILE,
  END_FETCH_PROFILE,
  PROFILE_UPDATE_ON_INIT,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
//   UPDATE_PROFILE_SUCCESS,
//   UPDATE_PROFILE_ERROR,
//   GOT_EXCHANGE_RATES
//   // END_UPDATE_PROFILE
} from '../constants';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  authHeaders: null,
  csrfToken: null,
  loading: false,
  isFetchProfileInProgress: false,
  error: '',
  exchangeRates: {}
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE_UPDATE_ON_INIT:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS: {
      const user = action.payload.user;
      const authHeaders = {};
      authHeaders[SESSION_EMAIL_KEY] = user.email;
      authHeaders[SESSION_TOKEN_KEY] = user.authentication_token;
      return {
        ...state,
        isAuthenticated: true,
        csrfToken: action.payload.csrf_token,
        user,
        authHeaders,
        loading: false,
        error: '',
        isFetchProfileInProgress: false,
        // exchangeRates: user.rates.rates
      };
    }
  //   case UPDATE_PROFILE_SUCCESS:
  //     return { ...state, user: action.payload.user};
    case FETCH_PROFILE: {
      return { ...state, isFetchProfileInProgress: true };
    }
  //   // case END_UPDATE_PROFILE:
    case END_FETCH_PROFILE: {
      return { ...state, isFetchProfileInProgress: false };
    }
    case REGISTER:
    case LOGIN: {
      return { ...state, loading: true, error: '' };
    }
  //   case UPDATE_PROFILE_ERROR:
    case REGISTER_ERROR:
    case LOGIN_ERROR: {
      return {
        ...state,
        isAuthenticated: false,
        authHeaders: null,
        loading: false,
        error: action.payload,
        isFetchProfileInProgress: false
      };
    }
    case LOGOUT:
      return { ...INITIAL_STATE, csrfToken: action.payload.csrf_token };
  //   case GOT_EXCHANGE_RATES:
  //     return { ...state, exchangeRates: action.payload.data.rates };
    default:
      return state;
  }
}
