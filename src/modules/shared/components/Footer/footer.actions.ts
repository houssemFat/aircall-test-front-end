// fixme
import { LOCALES_ACTIONS } from "../../redux/actions";

export function updateLocale(payload: string) {
  return {
    type: LOCALES_ACTIONS.UPDATE_LOCALE,
    payload
  };
}
