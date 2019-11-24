// SignIn.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight,
  Linking
} from 'react-native'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { USER_ID, TOKEN } from './config'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {BACKEND_SERVER} from 'react-native-dotenv';

export default class SignIn extends React.Component {

  state = {
    username: '', password: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {

      const login_response = await fetch('http://' + BACKEND_SERVER + '/amble/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password,
        }),
      });

      const login_json = await login_response.json();

      if (login_json.result === "success"){
        await AsyncStorage.setItem(TOKEN, login_json.return.token);
        await AsyncStorage.setItem('USER_ID', JSON.stringify(login_json.return.userID));
        this.props.navigation.navigate('App');
      }else{
        this.props.navigation.navigate('SignUp');
      }
    } catch (err) {
      console.log('error:', err)
    }
  }
  signUp = async () => {
    this.props.navigation.navigate('SignUp');
  }


  resetPassword = () => {
      Linking.openURL('http://' + BACKEND_SERVER + '/amble/auth/resetpassword').catch(err => console.error("Couldn't load page", err));
    };


  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.name}>
        Amble
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Username'
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor='#DDDDDD'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor='#DDDDDD'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TouchableHighlight style={styles.login}>
          <Button buttonStyle={{backgroundColor: '#1B879C'}}
            title='Login'
            onPress={this.signIn}
          />
        </TouchableHighlight>
        <TouchableHighlight style={styles.login}>
          <Button buttonStyle={{backgroundColor: '#1B879C'}}
            title='Sign Up'
            onPress={this.signUp}
          />
        </TouchableHighlight>

        <Text style={styles.bottomText}>
        Forgot your password? <Text onPress={this.resetPassword}>
           Reset it here!
        </Text></Text>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 300,
    fontSize: 18,
    fontWeight: '500',
    height: 55,
    backgroundColor: '#FEFEFE',
    margin: 10,
    color: '#AAAAAA',
    padding: 8,
    borderRadius: 18
  },
  name: {
    fontSize: 34,
    marginBottom:20,
    fontWeight:"bold",
    color: '#020202',
  },
  login: {
    width: 300,
    marginTop: 20,
    fontSize: 18,
    borderRadius: 18
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F16858'
  },
  logo: {
    width: 120,
    height: 120,
  },
  bottomText: {
    paddingTop: 10,
  }
})