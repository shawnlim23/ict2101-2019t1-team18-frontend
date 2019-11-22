// navigation.js
import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './SignIn';
import SignUp from './SignUp';

import AuthLoadingScreen from './AuthLoading';
import bottomTabNavigator from './Navigation'


const AuthStack = createStackNavigator({
	SignIn: SignIn,
	SignUp: SignUp,
}, {
	initialRouteName: 'SignIn',
})

export default createAppContainer(createSwitchNavigator(
	{
	  AuthLoading: AuthLoadingScreen,
	  App: bottomTabNavigator,
	  Auth: AuthStack,
	},
	{
	  initialRouteName: 'AuthLoading',
	}
  ));
