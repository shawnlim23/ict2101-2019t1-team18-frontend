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
import EditProfile from './EditProfile';
import Canvas from './Canvas';
import CreateCanvas from './CreateCanvas';
import CanvasDrawing from './CanvasDrawing';
import Icon from "react-native-vector-icons/FontAwesome";

import Testing from './Testing';


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

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
  EditProfile: {
    screen: EditProfile,
    navigationOptions: {
      headerTitle: 'EditProfile',
    },
  },
});

const CanvasStack = createStackNavigator({
  /*Canvas: {
    screen: Canvas,
    navigationOptions: {
      headerTitle: 'Canvas',
    },
  },*/
  CreateCanvas: {
    screen: CreateCanvas,
    navigationOptions: {
      headerTitle: 'Create Canvas',
    },
  },
  CanvasDrawing: {
    screen: CanvasDrawing,
    navigationOptions: {
      headerTitle: 'Canvas Drawing',
    },
  },/*
  Testing: {
    screen: Testing,
    navigationOptions: {
      headerTitle: 'Testing Drawing',
    },
  },*/
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
      screen: CanvasStack,
      navigationOptions: {
        tabBarLabel: 'Canvas',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="image" size={25} color={tintColor} />
        )
      }
    },
    Profile: {
      screen: ProfileStack,
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
