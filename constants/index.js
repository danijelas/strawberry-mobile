// export const HOST = 'https://takeaway.basaramilano.it';
// export const HOST = 'http://10.0.1.8:3000';
export const HOST = 'http://localhost:3000';
export const SESSION_EMAIL_KEY = 'cyril-user-email';
export const SESSION_TOKEN_KEY = 'cyril-user-token';
export const HEADERS_EMAIL_KEY = 'X-User-Email';
export const HEADERS_TOKEN_KEY = 'X-User-Token';
export const HEADERS_CSRF_TOKEN_KEY = 'X-CSRF-Token';

//action types
export const FETCH_PROFILE = 'FETCH_PROFILE';
export const END_FETCH_PROFILE = 'END_FETCH_PROFILE';
export const PROFILE_UPDATE_ON_INIT = 'PROFILE_UPDATE_ON_INIT';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const GET_LISTS = 'GET_LISTS';
export const GOT_LISTS = 'GOT_LISTS';
export const LIST_SELECTED = 'LIST_SELECTED';
export const GET_ITEMS = 'GET_ITEMS';
export const GOT_ITEMS = 'GOT_ITEMS';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';
export const END_UPDATE_PROFILE = 'END_UPDATE_PROFILE';
export const ADD_NEW_LIST_SUCCESS = 'ADD_NEW_LIST_SUCCESS';
export const DELETE_LIST_SUCCESS = 'DELETE_LIST_SUCCESS';
export const UPDATE_LIST_SUCCESS = 'UPDATE_LIST_SUCCESS';
export const ITEM_SELECTED = 'ITEM_SELECTED';
export const ADD_NEW_ITEM_SUCCESS = 'ADD_NEW_ITEM_SUCCESS';
export const DELETE_ITEM_SUCCESS = 'DELETE_ITEM_SUCCESS';
export const UPDATE_ITEM_SUCCESS = 'UPDATE_ITEM_SUCCESS';
export const TOGGLE_ITEM_DONE_SUCCESS = 'TOGGLE_ITEM_DONE_SUCCESS';
export const GOT_EXCHANGE_RATES = 'GOT_EXCHANGE_RATES';

// TMP CURRENCY
export const CURRENCY = [{id: 1, name: 'EUR'}, {id: 2, name: 'RSD'}, {id: 3, name: 'USD'}];
