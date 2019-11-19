// SignUp.js
import React, {Component} from 'react'
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  Alert,
  Button,
  TextInput,
  Picker,
  Image,
  StyleSheet
} from 'react-native'
import { signIn } from './navigation'
import {Navigation} from 'react-native-navigation';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', confirmPassword: '', language: 'English',
    modalVisible: false,
    date: new Date('2019-10-25T14:42:42'),
    mode: 'date',
    show: false,
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
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, language } = this.state
    try {
      // here place your signup logic
      console.log('user successfully signed up!: ', success)
    } catch (err) {
      console.log('error signing up: ', err)
    }
  }
  signIn = async () => {
    try {
       // sign up
       Navigation.pop(this.props.componentId);

    } catch (err) {
      console.log('error:', err)
    }
  }
 //user, email, dob, preferred lang, password, confirm password, i agree, sign up button
  render() {
    const { show, date, mode } = this.state;

    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('./assets/images/logo.png')}
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
            Language:
          </Text>
          <Picker
            selectedValue={this.state.language}
            style={{height: 50, width: 250,}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({language: itemValue})
            }>
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Mandarin" value="Mandarin" />
            <Picker.Item label="Malay" value="Malay" />
            <Picker.Item label="Tamil" value="Tamil" />
          </Picker>
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
          color="#1B879C"
          title='Sign Up'
          onPress={() => {
            //this.goHome;
            this.setModalVisible(true);
          }}
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
                <Button onPress={this.signIn}
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
    width: 100,
    fontSize: 18,
    fontWeight: '500',
    color: '#000000',
    textAlign: 'left', 
    paddingTop: 15,   
  },
  input: {
    width: 230,
    height: 55,
    backgroundColor: '#FEFEFE',
    margin: 10,
    padding: 8,
    color: '#AAAAAA',
    borderRadius: 18,
    fontSize: 18,
    fontWeight: '500',
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