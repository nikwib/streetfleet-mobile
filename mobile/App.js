import React, { Component } from 'react';
import Expo from 'expo';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximum: 1000};

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
   this.setState({
     location,
   });

  };

  postCoordinates() {
    fetch('http://20b8ca03.ngrok.io/api/v1/vehicle/location',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "time":Date.now(),
        "latitude": this.state.location.coords.latitude,
        "longitude": this.state.location.coords.longitude,
        "mac_address":"A5-70-F5-4E-B6-55"
      })
    })
  }

  watchLocation = () => {
    //TODO: use watch coordinates method
   this.setTimeoutId = setInterval( async () => {
     await this.getLocation();
     this.postCoordinates();
     this.checkDistance();
   }, 10000);
  };

  render() {
    return (
      <View><Text>{this.state.location.coords.latitude}</Text></View>
    );
  }
}

Expo.registerRootComponent(App);

