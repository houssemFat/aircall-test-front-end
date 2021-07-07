import { CALLS_ACTIONS } from "./calls.constants";

export function loadList(payload: string) {
  return {
    type: CALLS_ACTIONS.CALL_LOAD_LIST,
    payload
  };
}
