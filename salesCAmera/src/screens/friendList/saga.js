import {takeLatest, put} from 'redux-saga/effects';
import {friendsActionType} from './action_type';
import {request} from '../../services/service';
import {HTTP_METHODS} from '../../services/api_constants';
import {GET_FRIENDS_LIST} from '../../services/api_end_points';
import {store} from '../../store/configureStore';
function* getFriendsList(action) {
  try {
    const {response} = yield request(GET_FRIENDS_LIST, HTTP_METHODS.GET);
    yield put({
      type: friendsActionType.SAVE_FRIEND_LIST,
      payload: response.data,
    });
    console.log('<><><><><>getFriendsList Response ', response);
    yield action.payload.onSuccess(true, response.data);
  } catch (error) {
    yield action.payload.onSuccess(false, error);
  }
}
export function* getFriendsListWatcher() {
  yield takeLatest(friendsActionType.DO_GET_FRIEND, getFriendsList);
}
function* doAddFriend(action) {
  console.log('<><><><><>doAddFriendrequest ', action.payload);
  try {
    const {response} = yield request(
      GET_FRIENDS_LIST,
      HTTP_METHODS.POST,
      store.getState().FriendsReducer.addedFriendList,
    );
    console.log('<><><><><>doAddFriendResp Response ', response);
    yield put({
      type: friendsActionType.CLEAR_FRIEND,
      payload: [],
    });
    yield put({
      type: friendsActionType.DO_GET_FRIEND,
      payload: action.payload.onSuccess,
    });

    // yield action.payload.onSuccess(loginDataResponse.Response);
  } catch (error) {
    // yield action.payload.onSuccess(false, error);
    console.log('doen<><><><><>doAddFriend error ', error);
  }
}
export function* doAddFriendtWatcher() {
  yield takeLatest(friendsActionType.DO_ADD_FRIEND, doAddFriend);
}
