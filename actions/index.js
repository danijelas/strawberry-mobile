import { AsyncStorage } from 'react-native';
import axios from 'axios';
import {
  HOST,
  SESSION_EMAIL_KEY,
  SESSION_TOKEN_KEY,
  HEADERS_EMAIL_KEY,
  HEADERS_TOKEN_KEY,
  HEADERS_CSRF_TOKEN_KEY,
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
  // GET_LISTS,
  // GOT_LISTS,
  // GET_ITEMS,
  // GOT_ITEMS,
  // LIST_SELECTED,
  // UPDATE_PROFILE_SUCCESS,
  // ADD_NEW_LIST_SUCCESS,
  // DELETE_LIST_SUCCESS,
  // UPDATE_LIST_SUCCESS,
  // ITEM_SELECTED,
  // ADD_NEW_ITEM_SUCCESS,
  // DELETE_ITEM_SUCCESS,
  // UPDATE_ITEM_SUCCESS,
  // TOGGLE_ITEM_DONE_SUCCESS,
  // GOT_EXCHANGE_RATES
} from '../constants';

import store from '../store';

axios.defaults.baseURL = `${HOST}/api/v1`;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const headers = () => {
  const csrfToken = store.getState().auth.csrfToken;
  return {
    headers: { [HEADERS_CSRF_TOKEN_KEY]: csrfToken }
  };
};

const headersWithAuth = () => {
  // const token = 'wrong_token';
  const auth = store.getState().auth;
  const csrfToken = auth.csrfToken;
  const authHeadersFromStore = auth.authHeaders;
  const email = authHeadersFromStore[SESSION_EMAIL_KEY];
  const token = authHeadersFromStore[SESSION_TOKEN_KEY];
  const authHeaders = { [HEADERS_EMAIL_KEY]: email, [HEADERS_TOKEN_KEY]: token, [HEADERS_CSRF_TOKEN_KEY]: csrfToken };
  return {
    headers: authHeaders
  };
};

export const fetchProfile = () => async (dispatch) => {
  dispatch({ type: FETCH_PROFILE });
  const email = await AsyncStorage.getItem(SESSION_EMAIL_KEY);
  const token = await AsyncStorage.getItem(SESSION_TOKEN_KEY);

  if (email && token) {
    const csrfHeaders = headers().headers;
    const authHeaders = { ...csrfHeaders, ...{ [HEADERS_EMAIL_KEY]: email, [HEADERS_TOKEN_KEY]: token } };
    try {
      const response = await axios.get('/profile', { headers: authHeaders });
      const newCsrfToken = response.headers['x-csrf-token'];
      // fetchExchangeRates();
      dispatch({ type: PROFILE_UPDATE_ON_INIT, payload: { user: response.data, csrf_token: newCsrfToken } });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, payload: '' });
    }
  } else {
    dispatch({ type: END_FETCH_PROFILE });
  }
};

export const login = props => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    const response = await axios.post('/auth/login', { user: props }, headers());
    const user = response.data;
    await AsyncStorage.setItem(SESSION_EMAIL_KEY, user.email);
    await AsyncStorage.setItem(SESSION_TOKEN_KEY, user.authentication_token);
    const newCsrfToken = response.headers['x-csrf-token'];
    console.log('LOGIN');
    dispatch({ type: LOGIN_SUCCESS, payload: { user, csrf_token: newCsrfToken } });
  } catch (error) {
    if (error.response) {
      dispatch({ type: LOGIN_ERROR, payload: error.response.data.error });
    } else {
      dispatch({ type: LOGIN_ERROR, payload: 'Error: Can not login!' });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.delete('/auth/logout', headers());
    await AsyncStorage.removeItem(SESSION_EMAIL_KEY);
    await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
    const newCsrfToken = response.headers['x-csrf-token'];
    dispatch({ type: LOGOUT, payload: { csrf_token: newCsrfToken } });
  } catch (error) {
    await AsyncStorage.removeItem(SESSION_EMAIL_KEY);
    await AsyncStorage.removeItem(SESSION_TOKEN_KEY);
  }
};

export const register = props => async (dispatch) => {
  dispatch({ type: REGISTER });
  try {
    const response = await axios.post('/auth/register', { user: props }, headers());
    const user = response.data;
    await AsyncStorage.setItem(SESSION_EMAIL_KEY, user.email);
    await AsyncStorage.setItem(SESSION_TOKEN_KEY, user.authentication_token);
    const newCsrfToken = response.headers['x-csrf-token'];
    dispatch({ type: REGISTER_SUCCESS, payload: { user, csrf_token: newCsrfToken } });
  } catch (error) {
    if (error.response) {
      dispatch({ type: REGISTER_ERROR, payload: error.response.data.errors });
    } else {
      dispatch({ type: REGISTER_ERROR, payload: 'Error: Can not register!' });
    }
  }
}

// export const getLists = () => async(dispatch) => {
//   dispatch({type: GET_LISTS});
//   try {
//     const response = await axios.get('/lists', headersWithAuth());
//     dispatch({ type: GOT_LISTS, payload: response.data });
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.data);
//     } else {
//       console.log('Error', error.message);
//     }
//   }
// }

// export const getItems = (listId) => async(dispatch) => {
//   dispatch({type: GET_ITEMS});
//   try {
//     const response = await axios.get(`/lists/${listId}/items`, headersWithAuth());
//     dispatch({ type: GOT_ITEMS, payload: response.data });
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.data);
//     } else {
//       console.log('Error', error.message);
//     }
//   }
// }

// export function selectList(list) {
//   return {
//     type: LIST_SELECTED,
//     payload: list
//   };
// }

// export function updateProfile(props) {
//   return axios.put('/auth/update-profile', { user: props }, headersWithAuth());
// }

// export function updateProfileSuccess(props) {
//   return {
//     type: UPDATE_PROFILE_SUCCESS,
//     payload: props
//   };
// }

// export function addNewList(props) {
//   return axios.post('/lists', { list: props }, headersWithAuth());
// }

// export function addNewListSuccess(props) {
//   return {
//     type: ADD_NEW_LIST_SUCCESS,
//     payload: props
//   };
// }

// export function deleteList(list) {
//   return axios.delete(`/lists/${list.id}`, headersWithAuth());
// }

// export function deleteListSuccess(listId) {
//   return {
//     type: DELETE_LIST_SUCCESS,
//     payload: listId
//   };
// }

// export function updateList(list) {
//   return axios.patch(`/lists/${list.id}`, { list: list }, headersWithAuth());
// }

// export function updateListSuccess(list) {
//   return {
//     type: UPDATE_LIST_SUCCESS,
//     payload: list
//   };
// }

// export function selectItem(item) {
//   return {
//     type: ITEM_SELECTED,
//     payload: item
//   };
// }

// export function addNewItem(listId, props) {
//   return axios.post(`/lists/${listId}/items`, { item: props }, headersWithAuth());
// }

// export function addNewItemSuccess(props) {
//   return {
//     type: ADD_NEW_ITEM_SUCCESS,
//     payload: props
//   };
// }

// export function deleteItem(item) {
//   return axios.delete(`/lists/${item.list_id}/items/${item.id}`, headersWithAuth());
// }

// export function deleteItemSuccess(itemId) {
//   return {
//     type: DELETE_ITEM_SUCCESS,
//     payload: itemId
//   };
// }

// export function updateItem(item) {
//   return axios.patch(`/lists/${item.list_id}/items/${item.id}`, { item: item }, headersWithAuth());
// }

// export function updateItemSuccess(item) {
//   return {
//     type: UPDATE_ITEM_SUCCESS,
//     payload: item
//   };
// }

// export function toggleItemDone(item) {
//   return axios.post(`/lists/${item.list_id}/items/${item.id}/toggle-done`, { item: item }, headersWithAuth());
// }

// export function toggleItemDoneSuccess(item) {
//   return {
//     type: TOGGLE_ITEM_DONE_SUCCESS,
//     payload: item
//   };
// }

// const fetchExchangeRates = () => async(dispatch) => {
//   try {
//     console.log('FETCH');
//     const response = await axios.get('http://data.fixer.io/api/latest?access_key=f33841e59076334c993ca82a75778233');
//     console.log(response.data);
//     dispatch({ type: GOT_EXCHANGE_RATES, payload: response.data });
//   } catch (error) {
//     if (error.response) {
//       console.log(error.response.data);
//     } else {
//       console.log('Error', error.message);
//     }
//   }
// }
