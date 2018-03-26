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
    this.fetchFunction = this.fetchFunction.bind(this);
  }

  componentWillMount() {
    Location.watchPositionAsync(GEOLOCATION_OPTIONS, this.locationChanged);
  }
   
  fetchFunction() {
    fetch('http://88b961ba.ngrok.io/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.strignify({
        latitude:this.state.region.latitude,
        longitude:this.state.region.longitude,
        timestamp:34034034,
        mac_address:'70-47'
      })
    })
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

