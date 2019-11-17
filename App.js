import React from 'react';
import Autoc from './autocomplete';
import {StyleSheet,Text,View} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/homeScreen';
import DetailsScreen from './screens/detailScreen';
//<Autoc></Autoc>

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    headerMode:'none',  
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

const styles= StyleSheet.create({
  container:{
    flex:1 ,
    backgroundColor:'#fff',
    justifyContent:'center',
  },
  body:{
    flex:1,
    backgroundColor:'skyblue',
    justifyContent:'center',
    alignItems:'center',
  },
});