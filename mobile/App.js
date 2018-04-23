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
  View
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import BackgroundGeolocation from "react-native-background-geolocation";
import { PermissionsAndroid } from 'react-native';



type Props = {};
export default class App extends Component<Props> {
  constructor() {
    super();
    this.state ={
      mac:'',
      location: {coords:{latitude:0, longitude:0}},
    }
  DeviceInfo.getMACAddress().then(mac => {
    this.setState({mac:mac});
  })
  this.watchLocation();
}

postCoordinates() {
  fetch('https://streetfleet-mainserver.herokuapp.com/api/v1/vehicle/location',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "time":Date.now(),
      "latitude": this.state.location.coords.latitude,
      "longitude": this.state.location.coords.longitude,
      "mac_address":this.state.mac
    })
  })
  .catch(e => {
    console.log(e);
  })
}

  getLocation = async () => {
  test++
  const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  console.log('passed');
  if (status !== PermissionsAndroid.RESULTS.GRANTED) {
    this.setState({ errorMessage: 'Permission to access location was denied' });
  }

  const location = await navigator.geolocation.watchPosition((position) => {
    console.log(position.coords);
    this.setState({
      location:position,
    });
  }, err => {
    console.log(err);
    alert('fetching the position fail');
  }, {enableHighAccuracy: true, timeout: 20000, maximumAge: 0, distanceFilter: 1});
};

  watchLocation = async () => {
    console.log('hey yo');
    //TODO: use watch coordinates method

    await this.getLocation();
    this.postCoordinates();

   console.log('this',this.setTimeoutId);
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Mac_Address:{this.state.mac}
        </Text>
        <Text>
          latitude:{this.state.location.coords.latitude}
        </Text>
        <Text>
          longitude:{this.state.location.coords.longitude}
          test:{this.state.test}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
