/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';

const Home = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={{color: 'blue'}}>Hello Home</Text>
      </View>
    </SafeAreaView>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
