/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {
  getFriendsList,
  cacheFriend,
  updateTotalUser,
  doAddFriend,
} from '../friendList/action';
import NetInfo from '@react-native-community/netinfo';

const FriendsDetail = props => {
  const isEdit = props.route.params?.isEdit;
  const [user, setUser] = useState(props.route.params?.item);
  const [isAddUser, setAddUser] = useState(isEdit);
  const [buttonTitle, setButtonTitle] = useState(
    isEdit ? 'Done' : 'Add New Friend',
  );
  const [name, setName] = useState(isEdit ? user.Name : '');
  const [fName, setfName] = useState(isEdit ? user.First_Name__c : '');
  const [lName, setlName] = useState(isEdit ? user.Last_Name__c : '');
  const [age, setage] = useState(isEdit ? user.Age__c : '');
  const cachedFriend = [...props.FriendsReducer.addedFriendList];
  const frndsList = [...props.FriendsReducer.friendsList];

  const makeid = length => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.charAt(0).toLowerCase() + result.slice(1);
  };
  const onChangefName = value => {
    setfName(value);
  };
  const onChangelName = value => {
    setlName(value);
  };
  const onChangeAge = value => {
    setage(value);
  };
  const onChangeName = value => {
    setName(value);
  };
  const callAddUserAPI = () => {
    console.log('Add User name ', name);
    if (
      name &&
      name.trim().length > 0 &&
      fName &&
      fName.trim().length > 0 &&
      lName &&
      lName.trim().length > 0 &&
      age &&
      age.trim().length > 0
    ) {
      console.log('Add User name in ', name);
      const userObj = {
        attributes: {type: 'Friend__c'},
        Name: isEdit ? user.Name : name.trim(),
        First_Name__c: fName.trim(),
        Last_Name__c: lName.trim(),
        Age__c: age.trim(),
      };
      if (cachedFriend.length > 0) {
        let index = 0;
        let outerIndx = 0;
        const dataarray = cachedFriend.filter((el, indx) => {
          index = indx;
          return el.Name === user.Name;
        });
        const outerData = frndsList.filter((el, indx) => {
          outerIndx = indx;
          return el.Name === user.Name;
        });
        if (dataarray?.length > 0) {
          cachedFriend.splice(index, 1, userObj);
          frndsList.splice(outerIndx, 1, userObj);
          props.cacheFriend({data: cachedFriend});
          props.updateTotalUser({data: frndsList});
          doAddFriendApi();
        } else {
          addTotheApi(userObj);
        }
      } else {
        addTotheApi(userObj);
      }
    }
  };
  const addTotheApi = userObj => {
    frndsList.push(userObj);
    cachedFriend.push(userObj);
    props.cacheFriend({data: cachedFriend});
    props.updateTotalUser({data: frndsList});
    doAddFriendApi();
  };
  const doAddFriendApi = () => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        props.doAddFriend({
          onSuccess: (isSuccess, data) => {
            DeviceEventEmitter.emit('FriendAdded', '');
          },
        });
      } else {
        DeviceEventEmitter.emit('FriendAdded', '');
      }
    });
    props.navigation.goBack();
  };
  const openForm = () => {
    setButtonTitle('Done');
    setAddUser(true);
  };
  return (
    <View style={styles.container}>
      {user && !isAddUser ? (
        <View style={styles.innercontainer}>
          <View style={{flexDirection: 'row'}}>
            <Text>{user.First_Name__c}</Text>
            <Text style={{marginHorizontal: 5}}>{user.Name}</Text>
          </View>
          <Text style={{marginVertical: 2}}>{`Age: ${user.Age__c}`}</Text>
          <Text style={{marginVertical: 2}}>{`ID: ${user.Id}`}</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            value={name}
            placeholder="Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangefName}
            value={fName}
            placeholder="First Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangelName}
            value={lName}
            placeholder="Last Name"
            keyboardType="default"
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeAge}
            value={age}
            placeholder="Age"
            keyboardType="default"
          />
        </View>
      )}
      <Button
        title={buttonTitle}
        onPress={() =>
          buttonTitle === 'Add New Friend' ? openForm() : callAddUserAPI()
        }
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    FriendsReducer: state.FriendsReducer,
  };
};

const mapDispatchToProps = {
  getFriendsList: getFriendsList,
  cacheFriend: cacheFriend,
  updateTotalUser: updateTotalUser,
  doAddFriend: doAddFriend,
};
export default connect(mapStateToProps, mapDispatchToProps)(FriendsDetail);

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  innercontainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
