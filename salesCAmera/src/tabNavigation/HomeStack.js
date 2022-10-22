import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/landing';
const HomeStacks = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <HomeStacks.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <HomeStacks.Screen
        name="HomeScreen"
        component={Home}
        options={{headerShown: false}}
      />
    </HomeStacks.Navigator>
  );
};

export default HomeStack;
