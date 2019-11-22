/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *

 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import Map from './src/components/Map'
import { Button, ThemeProvider, Header } from 'react-native-elements';
import AppNavigator from './src/components/screens'


export default class App extends React.Component {
	render() {
	  return <AppNavigator />;
	}
  }