import { IAction } from "../../shared/redux/actions.constants";

// TODO , add navigator.language or use cookie if the server can set the locale cookie
export const initialState = {
  totalItems: Infinity,
  currentPageIndex: 0,
  checkedItems: {}
}

export function callsReducer(state = initialState, action: IAction) {
  // todo
  return state;
}

