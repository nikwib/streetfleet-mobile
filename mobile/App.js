/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
       <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
          style={styles.image}
          source={require('./logos/sf-v-logo.png')}
          />
        </View>  
        <View style={styles.connected}>
          <Text>Connected</Text>
        </View>  
        <View style={styles.textContainer}>
          <Text>MAC:FD:4F:5A:54:D8</Text> 
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  connected: {
    flex: 1,
    justifyContent: 'space-around'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    width: 200
  },
  textContainer: {
    flex: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  } 
});

