import {friendsActionType} from './action_type';
const initialState = {
  loading: true,
  friendsList: [],
  addedFriendList: [],
};
const FriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case friendsActionType.SAVE_FRIEND_LIST:
      return {
        ...state,
        friendsList: action.payload,
      };
    case friendsActionType.DO_CACHE_FRIEND:
      return {
        ...state,
        addedFriendList: action.payload,
      };
    case friendsActionType.DO_ADD_FRIEND_LIST:
      console.log('action.payload DO_ADD_FRIEND_LIST ', action.payload);
      return {
        ...state,
        friendsList: action.payload,
      };
    case friendsActionType.CLEAR_FRIEND:
      console.log('action.payload DO_ADD_FRIEND_LIST ', action.payload);
      return {
        ...state,
        addedFriendList: [],
      };
    default: {
      return state;
    }
  }
};
export default FriendsReducer;
