import { combineReducers } from "redux";
import { IAction, LOCALES_ACTIONS } from "./actions.constants";
import LOCALSTORAGE_KEYS from "../constants/localstorage";
import { callsReducer } from './../../calls/redux/reducers'

// TODO , add navigator.language or use cookie if the server can set the locale cookie
export const initialIntlState = {
  locale: localStorage.getItem(LOCALSTORAGE_KEYS.LOCALE_KEY) || 'fr',
  messages: {},
}

export function intlReducer(state = initialIntlState, action: IAction) {

  if (action.type === LOCALES_ACTIONS.UPDATE_LOCALE) {
    let locale = action.payload;
    localStorage.setItem(LOCALSTORAGE_KEYS.LOCALE_KEY, locale);
    return {...state, ...{locale}};
  }
  return state;
}


export default combineReducers({
  intlReducer,
  callsReducer
})
