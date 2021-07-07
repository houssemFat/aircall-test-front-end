import { setContext } from "@apollo/client/link/context";
import SESSIONSTORAGE_KEYS from "../../constants/sessionStorage";

const authLink = setContext((_, {headers}) => {
  // TODO, this should be retrieved from a dedicated module
  let token = sessionStorage.getItem(SESSIONSTORAGE_KEYS.TEMP_ACCESS_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
export default authLink;
