import React, { Component } from 'react';
import Expo from 'expo';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximum: 1000};

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      location: { coords: {latitude: 0, longitude: 0}},
    };

    this.locationChanged = this.locationChanged.bind(this);

  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }

  locationChanged  = (location) => {
    region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.05
    },
    this.setState({location, region})
  }

  render() {
    return (
      <Expo.MapView
        style={{ flex: 0.5 }}
        showsUserLocation={true}
        region={this.state.region}
      />    
    );
  }
}

Expo.registerRootComponent(App);

