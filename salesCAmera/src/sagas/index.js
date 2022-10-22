import {all} from 'redux-saga/effects';
import {
  getFriendsListWatcher,
  doAddFriendtWatcher,
} from '../screens/friendList/saga';
// Redux saga: Root saga
export function* rootSaga() {
  yield all([getFriendsListWatcher(), doAddFriendtWatcher()]);
}
