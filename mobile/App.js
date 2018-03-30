import React, { Component } from 'react';
import Expo from 'expo';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

export default class App extends React.Component {

  constructor()  {
    super();

    this.state = {
      location: {coords:{latitude:0, longtitude:0}}
    }
    this.watchLocation();
  }

 getLocation = async () => {
   const { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({ errorMessage: 'Permission to access location was denied' });
   }

   const location = await Location.getCurrentPositionAsync({});
   console.log(location);
   this.setState({
     location,
   });

  };

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
        "mac_address":Expo.Constants.deviceId
      })
    })
    .catch(e => {
      console.log(e);
    })
  }

  watchLocation = () => {
    console.log('hey yo');
    //TODO: use watch coordinates method
   this.setTimeoutId = setInterval( async () => {
    console.log('inside');
     await this.getLocation();
     this.postCoordinates();
   }, 2000);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 100,
          padding: 20,
        }}><Text>{Expo.Constants.deviceId}</Text></View>
    );
  }
}


Expo.registerRootComponent(App);

