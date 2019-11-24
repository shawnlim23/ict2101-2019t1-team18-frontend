// SignUp.js
import React, {Component} from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  TextInput,
  Picker,
  Image,
  StyleSheet
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Button } from 'react-native-elements';
import {BACKEND_SERVER} from 'react-native-dotenv';


export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', confirmPassword: '', sex: 'Male', commuteMethod: 'Walking',
    modalVisible: false,
    emailErrorModalVisible: false,
    invalidEmailErrorModalVisible: false,
    date: new Date(),
    mode: 'date',
    show: false,
    dataResponse: '',
    results: {}
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
  }

  show = mode => {
    this.setState({
      show: true,
      mode,
    });
  }

  datepicker = () => {
    this.show('date');
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEmailErrorModalVisible(visible) {
    this.setState({emailErrorModalVisible: visible});
  }

  setInvalidEmailErrorModalVisible(visible) {
    this.setState({invalidEmailErrorModalVisible: visible});
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {

    console.log('test')

    const { username, password, email, sex, commuteMethod, date } = this.state

    try {
      // here place your signup logic
      const url = 'http://' + BACKEND_SERVER + '/amble/auth/register'
      const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: username,
          birthdate: date.toLocaleDateString(),
          sex: sex,
          commute_method: commuteMethod,
        })
      };
      //await fetch(url, setting)
      const data = await fetch(url, settings);

      //      const data = await fetch(url2);

      const data_response = await data.json();
      //console.log(data_response)
      this.setState({
          results: data_response,
      })


      console.log(settings.body)
      console.log(typeof(settings.body))
      //this.setModalVisible(true);
      console.log('user successfully signed up!: ', data_response)
      this.props.navigation.navigate('SignIn');

    } catch (err) {
      //this.setEmailErrorModalVisible(true);
      console.log('error signing up: ', err)
    }

    if(this.state.results.error == "email already in use") {
      this.setEmailErrorModalVisible(true);
    } else if(this.state.results.error == "invalid email") {
      this.invalidEmailErrorModalVisible(true);
    } else {
      this.setModalVisible(true);
    }
    console.log(this.state.results.result)

  }

  signIn() {
    this.props.navigation.navigate('SignIn');
  }

  render() {
    const { show, date, mode } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <View style={styles.row}>
          <Text style={styles.text}>
            Username:
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Username'
            autoCapitalize="none"
            placeholderTextColor='#DDDDDD'
            onChangeText={val => this.onChangeText('username', val)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Email:
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='#DDDDDD'
            onChangeText={val => this.onChangeText('email', val)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Birthdate:
          </Text>
          <View>
            <Text testID="dateTimeText" style={styles.input} onPress={this.datepicker} title="Birthdate">
              { mode === 'time' && moment.utc(date).format('HH:mm') }
              { mode === 'date' && moment.utc(date).format('MM/DD/YYYY') }
            </Text>
              { show && <DateTimePicker value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={this.setDate}
                maximumDate={new Date()}
                minimumDate={new Date(1920, 1, 1)}/>
              }
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Sex:
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.sex}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({sex: itemValue})
              }>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Commute Method:
          </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={this.state.commuteMethod}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({commuteMethod: itemValue})
              }>
              <Picker.Item label="Walking" value="Walking" />
              <Picker.Item label="Cycling" value="Cycling" />
              <Picker.Item label="Bus" value="Bus" />
              <Picker.Item label="Mrt" value="Mrt" />
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Password:
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='#DDDDDD'
            onChangeText={val => this.onChangeText('password', val)}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>
            Confirm Password:
          </Text>
          <TextInput
            style={styles.input}
            placeholder='Confirm Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='#DDDDDD'
            onChangeText={val => this.onChangeText('confirmPassword', val)}
          />
        </View>
        <Button
          buttonStyle={{backgroundColor: '#1B879C'}}
          title='Sign Up'
          onPress={this.signUp}
        />
        <Text style={styles.bottomText}>
        Already a member? <Text onPress={this.signIn}>
           Sign in here!
        </Text></Text>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.successModal}>
            <View>
              <Text>User successfully created!</Text>

              <TouchableHighlight>
                <Button buttonStyle={{backgroundColor: '#1B879C'}}
                onPress={this.signIn}
                  title="Okay!"
                  style={{backgroundColor: '#1B879C'}}
                />
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.emailErrorModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.successModal}>
            <View>
              <Text>Email already in use!</Text>

              <TouchableHighlight>
                <Button buttonStyle={{backgroundColor: '#1B879C'}}
                onPress={this.signIn}
                  title="Okay!"
                  style={{backgroundColor: '#1B879C'}}
                />
              </TouchableHighlight>

            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.invalidEmailErrorModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={styles.successModal}>
            <View>
              <Text>Invalid email!</Text>

              <TouchableHighlight>
                <Button buttonStyle={{backgroundColor: '#1B879C'}}
                onPress={this.signIn}
                  title="Okay!"
                  style={{backgroundColor: '#1B879C'}}
                />
              </TouchableHighlight>

            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    width: 70,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'left',
    paddingTop: 15,
  },
  input: {
    width: 200,
    height: 40,
    backgroundColor: '#FEFEFE',
    margin: 10,
    padding: 8,
    color: '#AAAAAA',
    borderRadius: 6,
    fontSize: 16,
  },
  pickerContainer: {
    width: 200,
    height: 45,
    backgroundColor: '#FEFEFE',
    margin: 10,
    color: '#AAAAAA',
    borderRadius: 6,
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F16858',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  successModal: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 300,

  },
  bottomText: {
    paddingTop: 10,
  }
})
