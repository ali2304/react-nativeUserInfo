/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getFriendsList} from './action';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Linking,
  DeviceEventEmitter,
} from 'react-native';
import {store} from '../../store/configureStore';
import NetInfo from '@react-native-community/netinfo';

const Friends = props => {
  let num = 100; // This is the number which defines how many data will be loaded for every 'onReachEnd'
  let initialLoadNumber = 40; // This is the number which defines how many data will be loaded on first open

  const [offset, setOffset] = useState(1); //Its Like Page number
  const [userList, setUserList] = useState<[]>([]); //Contains the whole data
  const [dataSource, setDataSource] = useState<[]>([]); //Contains limited number of data
  const windowSize = userList.length > 50 ? userList.length / 4 : 21;

  useEffect(() => {
    // for Deelink Call back
    if (Platform.OS === 'android') {
      //  Linking.addEventListener('url', this._handleOpenURL);
      Linking.getInitialURL().then(url => {
        navigate(url);
      });
      const subscribe = Linking.addEventListener('url', handleOpenURL);
      return () => {
        subscribe.remove();
      };
    } else {
      const subscribe = Linking.addEventListener('url', handleOpenURL);
      return () => {
        subscribe.remove();
      };
    }
  }, []);

  /**
   * <h>handleOpenURL</h>
   * handleOpenURL handels the page navigation
   */
  const handleOpenURL = event => {
    console.log('handleOpenURL ', event.url);
    navigate(event.url);
  };

  /**
   * <h>navigate</h>
   * navigate funtionaly to formate the URL and put that URL to navigate
   */
  const navigate = url => {
    console.log('navigate ', url);
    callAPI(false, url);
    // navigateTo('DeepLinkPage', url);
  };

  useEffect(() => {
    callAPI(true);
    const unsubscribe = NetInfo.addEventListener(state => {
      if (store.getState().FriendsReducer.addedFriendList.length > 0) {
        props.doAddFriend({
          onSuccess: (isSuccess, data) => {
            setUserList(data);
          },
        });
      }
    });

    const subscrib = DeviceEventEmitter.addListener('FriendAdded', () => {
      setUserList(store.getState().FriendsReducer?.friendsList);
    });
    return () => {
      subscrib();
      unsubscribe();
    };
  }, []);

  const callAPI = (isFromEffect, url) => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        if (props.FriendsReducer?.friendsList?.length > 0) {
          if (isFromEffect) {
            setUserList(props.FriendsReducer?.friendsList);
          } else {
            manipulateUrl(props.FriendsReducer?.friendsList, url);
          }
        } else {
          props.getFriendsList({
            onSuccess: (isSuccess, data) => {
              if (isSuccess) {
                if (isFromEffect) {
                  setUserList(data);
                } else {
                  manipulateUrl(data, url);
                }
              }
            },
          });
        }
      } else {
        if (props.FriendsReducer?.friendsList?.length > 0) {
          if (isFromEffect) {
            setUserList(props.FriendsReducer?.friendsList);
          } else {
            manipulateUrl(props.FriendsReducer?.friendsList, url);
          }
        }
      }
    });
  };
  const manipulateUrl = (data, url) => {
    const dataArray = data.filter(el => url.includes(el.Id));
    console.log('manipulateUrl dataArray ', dataArray);
    if (dataArray?.length > 0) {
      navigateTo('FriendsDetail', dataArray[0]);
    }
  };
  //Here we setting our data source on first open.
  useEffect(() => {
    if (dataSource.length < userList.length) {
      if (offset === 1) {
        setDataSource(userList.slice(0, offset * initialLoadNumber));
      }
    }
  }, [userList]);

  const navigateTo = (screen, data) => {
    console.log('navigateTo ', {item: data});
    let isEdit = false;
    if (store.getState().FriendsReducer.addedFriendList.length > 0) {
      const addData = store
        .getState()
        .FriendsReducer.addedFriendList.filter(el => el.Name === data.Name);
      if (addData?.length > 0) {
        isEdit = true;
      }
    }
    props.navigation.navigate(screen, {
      item: data,
      isEdit: isEdit,
    });
  };
  // When scrolling we set data source with more data.
  const getData = () => {
    if (dataSource.length < userList.length && userList.length !== 0) {
      setOffset(offset + 1);
      setDataSource(userList.slice(0, offset * num)); //We changed dataSource.
    }
  };
  const keyExtractor = item => item.Id;
  const renderSeparator = () => {
    return (
      <View style={{flex: 1, height: 0.5, backgroundColor: '#aeaeae'}}></View>
    );
  };
  const renderItem = ({item}) => {
    //Your render component
    return (
      <TouchableOpacity
        onPress={() => navigateTo('FriendsDetail', item)}
        style={{marginHorizontal: 10, marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text>{item.First_Name__c}</Text>
          <Text style={{marginHorizontal: 5}}>{item.Name}</Text>
        </View>
        <Text style={{marginVertical: 2}}>{`Age: ${item.Age__c}`}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {userList.length !== 0 && (
          <Text style={{marginHorizontal: 10, alignItems: 'center'}}>
            {userList.length}
          </Text>
        )}
        {userList.length !== 0 && (
          <FlatList
            data={dataSource}
            renderItem={renderItem}
            inverted={false}
            initialNumToRender={initialLoadNumber}
            windowSize={windowSize}
            maxToRenderPerBatch={num}
            updateCellsBatchingPeriod={num / 2}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => renderSeparator()}
            onEndReachedThreshold={
              offset < 10 ? offset * (offset === 1 ? 2 : 2) : 20
            }
            onEndReached={getData}
            removeClippedSubviews={true}
          />
        )}
      </View>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    FriendsReducer: state.FriendsReducer,
  };
};

const mapDispatchToProps = {
  getFriendsList: getFriendsList,
};
export default connect(mapStateToProps, mapDispatchToProps)(Friends);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
