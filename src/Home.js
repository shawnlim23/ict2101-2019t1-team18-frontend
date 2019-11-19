/*import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Home extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});
*/
// Home.js
import React from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import { signIn } from './navigation'
import {Navigation} from 'react-native-navigation';

import { USER_KEY } from './config'

export default class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      signIn()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <Button color="#1B879C"
          onPress={this.logout}
          title="Sign Out"
        />
        <Button color="#1B879C"
          onPress={() => {

            Navigation.push(this.props.componentId, {
              component: {
                name: 'Amble.Screen2',
              }
            });
          }}
          title="View next screen"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})