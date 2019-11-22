// navigation.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Route from './Map-route';
import Map from './Map';
import Leaderboard from './Leaderboard';
import Profile from './Profile';
import Canvas from './Canvas';
import Icon from "react-native-vector-icons/FontAwesome";


const MapStack = createStackNavigator({
  Journey: {
    screen: Map,
    navigationOptions: {
      headerTitle: 'Journey',
    },
  },
  Route: {
    screen: Route,
    navigationOptions: {
      headerTitle: 'Routes',
    },
  },
});




const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: MapStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({tintColor, activeTintColor}) => (
          <Icon name="home" size={25} color={tintColor} />
        ),
      }
    },
    Leaderboard: {
      screen: Leaderboard,
      navigationOptions: {
        tabBarLabel: 'Leaderboard',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="trophy" size={25} color={tintColor} />
        )
      }
    },
    Canvas: {
      screen: Canvas,
      navigationOptions: {
        tabBarLabel: 'Canvas',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="image" size={25} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={25} color={tintColor} />
        )
      }
    },

  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#F16858'
    },
    barStyle: { backgroundColor: '#F16858' }
  }
);


export default createAppContainer(bottomTabNavigator);
