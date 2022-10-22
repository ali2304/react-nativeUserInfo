import {combineReducers} from 'redux';
import FriendsReducer from '../screens/friendList/reducer';

const appreducer = combineReducers({
  FriendsReducer: FriendsReducer,
});
const rootReducer = (state, action) => {
  return appreducer(state, action);
};
export default rootReducer;
