
import { IAction } from "./actions";



// Worker saga will be fired on USER_FETCH_REQUESTED actions
function* fetchUserInfo(action: IAction) {
  // get user info
}


// Starts fetchUser on each dispatched USER_FETCH_REQUESTED action
// Allows concurrent fetches of user
export default function* fetchUserInfoSaga() {
  //
}
