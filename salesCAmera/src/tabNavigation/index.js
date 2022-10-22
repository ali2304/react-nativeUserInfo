import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FriendStack from './FriendStack';
import SettingStack from './SettingStack';
//import HomeScreenStack from './HomeScreenStack';

const Tab = createBottomTabNavigator();
const TabNavigator = props => {
  Tab.navigationOptions = {
    headerLeft: null,
    backgroundColor: 'white',
  };
  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 0,
          backgroundColor: '#FFFFFF',
          borderTopColor: 'transparent',
          height: '10%',
        },
        showLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Friends"
        component={FriendStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                style={styles.TabIcon}
                source={require('../assets/friends.png')}
              />
              {/* <Text style={styles.TabText}>{'Friends'} </Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                style={styles.TabIcon}
                source={require('../assets/home.png')}
              />
              {/* <Text style={styles.TabText}>{'Home'} </Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingStack}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.tabIconContainer}>
              <Image
                style={styles.TabIcon}
                source={require('../assets/settings.png')}
              />
              {/* <Text style={styles.TabText}>{'Settings'} </Text> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TabText: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#000000',
    textAlign: 'center',
  },
  TabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    marginTop: 5,
    tintColor: '#6F8FAF',
  },
});

export default TabNavigator;
