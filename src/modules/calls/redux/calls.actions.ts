import { CALLS_ACTIONS } from "./calls.constants";

export function updateCheckedListItem(payload: { [key: string]: boolean; } ) {
  return {
    type: CALLS_ACTIONS.CALLS_UPDATE_CHECKLIST,
    payload
  };
}
