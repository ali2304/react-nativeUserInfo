import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Settings from '../screens/settings';
const SettingStacks = createNativeStackNavigator();
const SettingStack = () => {
  return (
    <SettingStacks.Navigator
      screenOptions={{
        headerBackImage: '',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}>
      <SettingStacks.Screen
        name="SettingsScreen"
        component={Settings}
        options={{headerShown: false}}
      />
    </SettingStacks.Navigator>
  );
};

export default SettingStack;
