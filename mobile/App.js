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

componentWillMount() {
  console.log('hey background');
  BackgroundGeolocation.on('location', this.onLocation, this.onError);

  // This handler fires when movement states changes (stationary->moving; moving->stationary)
  BackgroundGeolocation.on('motionchange', this.onMotionChange);

  // This event fires when a change in motion activity is detected
  BackgroundGeolocation.on('activitychange', this.onActivityChange);

  // This event fires when the user toggles location-services authorization
  BackgroundGeolocation.on('providerchange', this.onProviderChange);

  BackgroundGeolocation.ready({
    desiredAccuracy: 0,
    distanceFilter: 1,
    stopTimeout: 1,
    debug: true,
    logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
    stopOnTerminate: false,
    startOnBoot: true,
    url: 'https://streetfleet-mainserver.herokuapp.com/api/v1/vehicle/location',
    batchSync: false,
    autoSync: true,
 }, (state) => {
   if(!state.enabled) {
     BackgroundGeolocation.start(function () {
       console.log('Start success');
     })
   }
 })
}

onLocation(location) {
  console.log('location coords',location);
}
onError(error) {
  console.log(error);
}
onActivityChange(activity) {
  console.log('- [event] activitychange: ', activity);  // eg: 'on_foot', 'still', 'in_vehicle'
}
onProviderChange(provider) {
  console.log('- [event] providerchange: ', provider);
}
onMotionChange(location) {
  console.log('- [event] motionchange: ', location.isMoving, location);
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
