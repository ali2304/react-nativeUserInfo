import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Friends from '../screens/friendList';
import FriendsDetail from '../screens/friendsDetail';
const FriendStacks = createNativeStackNavigator();
const FriendStack = () => {
  return (
    <FriendStacks.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: true,
      }}>
      <FriendStacks.Screen
        name="FriendsScreen"
        component={Friends}
        options={{title: 'Friends'}}
      />
      <FriendStacks.Screen
        name="FriendsDetail"
        component={FriendsDetail}
        options={{title: 'Friends Detials'}}
      />
    </FriendStacks.Navigator>
  );
};

export default FriendStack;
