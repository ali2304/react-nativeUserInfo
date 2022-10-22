import {friendsActionType} from './action_type';

export const getFriendsList = ({onSuccess}) => ({
  type: friendsActionType.DO_GET_FRIEND,
  payload: {onSuccess},
});
export const doAddFriend = ({onSuccess}) => ({
  type: friendsActionType.DO_ADD_FRIEND,
  payload: {onSuccess},
});
export const cacheFriend = ({data}) => ({
  type: friendsActionType.DO_CACHE_FRIEND,
  payload: data,
});
export const updateTotalUser = ({data}) => ({
  type: friendsActionType.DO_ADD_FRIEND_LIST,
  payload: data,
});
