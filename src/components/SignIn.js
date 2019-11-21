// SignIn.js
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  AsyncStorage,
  TouchableHighlight
} from 'react-native'
import {Navigation} from 'react-native-navigation';

import { goHome } from './Navigation'
import { USER_KEY } from './config'

import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


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
       // login with provider
       const user = await AsyncStorage.setItem(USER_KEY, username)
       console.log('user successfully signed in!', user)
       goHome()
    } catch (err) {
      console.log('error:', err)
    }
  }
  signUp = async () => {
    try {
       // sign up
       Navigation.push(this.props.componentId, {
        component: {
          name: 'Amble.SignUp',
          passProps: {
              text: 'Pushed screen'
          },
          options: {
              topBar: { visible: false,
                title: {
                  //text: 'Back'
                }
              }
          }
        }
      });
       //signIn()
    } catch (err) {
      console.log('error:', err)
    }
  }
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
  }
})