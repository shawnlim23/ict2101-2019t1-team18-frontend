import React, {Component} from 'react';
import {Modal, TouchableHighlight, View, Text, TextInput, StyleSheet, Image, ScrollView, AsyncStorage, Button, Picker} from 'react-native';
import {BACKEND_SERVER} from 'react-native-dotenv';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


class EditProfile extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      sex: '',
      commute_method: '',
      birthday: '',
      editable: true,
      mode: 'date',
      modalVisible: false,
    }
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
      birthday: date.toLocaleDateString(),
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

  async getUserDetails(){

    const id = await AsyncStorage.getItem('USER_ID');

    const getUser = await fetch('http://' + BACKEND_SERVER + `/amble/user/${ id }`);

    const getUserJson = await getUser.json();

    this.setState({
      name: getUserJson.name,
      sex: getUserJson.sex,
      commute_method: getUserJson.commute_method.toString(),
      birthday: getUserJson.birthdate,
      date: moment(getUserJson.birthdate, "DD/MM/YYYY").toDate() 
    })

  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  LogOut(){

    AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  }

  updateSuccess() {
    this.props.navigation.navigate('Profile');
  }

  Save = async () => {
    const { name, sex, commute_method, birthday } = this.state
    try {

      const id = await AsyncStorage.getItem('USER_ID');

      const updateProfile_response = await fetch('http://' + BACKEND_SERVER + `/amble/user/${ id }`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthdate: birthday,
          commute_method: commute_method,
          name: name,
          sex: sex
        }),
      });

      const updateProfile_json = await updateProfile_response.json();
      //console.log(updateProfile_json.result)
      this.setModalVisible(true);
      /*if (updateProfile_json.result === "success"){
        //this.setModalVisible(true);
        //this.props.navigation.navigate('App');
        console.log('updated successfully')
      }else{
        //this.props.navigation.navigate('SignUp');
      }*/
    } catch (err) {
      console.log('error:', err)
    }
  }

  Cancel(){
    this.props.navigation.navigate('Profile');
  }

  componentDidMount(){
      this.getUserDetails();
  }

  render() {
    const { show, date, mode } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={[styles.card, styles.profileCard]}>
              <Image style={styles.avatar} source={require('../assets/images/avatar.png')} />
          </View>
          <View style={styles.card, styles.firstItem, styles.alignContainer}>

            <View style={styles.row}>
              <Text style={styles.titleText}>
                Name:
              </Text>
              <TextInput
                style={styles.name}
                autoCapitalize="none"
                placeholderTextColor='#808080'
                defaultValue={this.state.name}
                editable={this.state.editable}
                onChangeText={val => this.onChangeText('name', val)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.titleText}>
                Gender:
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
              <Text style={styles.titleText}>
                Birthday:
              </Text>
              <View>
                <Text testID="dateTimeText" style={styles.name} onPress={this.datepicker} title="Birthdate">
                  { mode === 'date' && moment.utc(this.state.birthday).format('MM/DD/YYYY') }
                </Text>
                  { show && <DateTimePicker value={this.state.date}
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
              <Text style={styles.titleText}>
                Commute Method:
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={this.state.commute_method}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({commute_method: itemValue})
                  }>
                  <Picker.Item label="Walking" value="Walking" />
                  <Picker.Item label="Cycling" value="Cycling" />
                  <Picker.Item label="Bus" value="Bus" />
                  <Picker.Item label="Mrt" value="Mrt" />
                </Picker>
              </View>
            </View>

          </View>

          <View style={styles.profileButtons}>
            <Button onPress={() => {this.Save()}} title="Save"></Button>
          </View>
          <View style={styles.profileButtons}>
            <Button onPress={() => {this.Cancel()}} title="Cancel"></Button>
          </View>

          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.successModal}>
              <View>
                <Text>User successfully updated!</Text>

                <TouchableHighlight>
                  <Button buttonStyle={{backgroundColor: '#1B879C'}}
                    onPress={() => this.props.navigation.navigate('Profile')}
                    title="Okay!"
                    style={{backgroundColor: '#1B879C'}}
                  />
                </TouchableHighlight>

              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    );
  }
}

export default EditProfile;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor : "#DCDCDC",
    backgroundColor: '#D3EDFF',
    height: 610,
  },
  cardTitle:{
    color:"#808080",
    fontSize:22,
    marginBottom:5,
  },
  profileContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    width: 300
  },
  avatar:{
    width:150,
    height:150,
  },
  titleText: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  card:{
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
    padding:10,
    height:100,
    marginTop:10,
  },
  cardBot: {
    backgroundColor: "#FFFFFF",
    borderRadius:10,
    padding:10,
    height:100,
    marginTop:10,
  },
  profileCard:{
    height:170,
    alignItems: 'center',
    marginTop:20,
  },
  name:{
    marginLeft:10,
    fontSize:22,
    color:"#808080",
    paddingTop: 12,
  },
  alignContainer: {
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    height: 200,
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  photosContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard:{
    marginTop:10,
  },
  photo:{
    width:108,
    height:108,
    marginTop:5,
    marginRight:5,
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  profileButtons: {
    marginTop: 10,
  },
  pickerContainer: {
    width: 150,
    backgroundColor: '#FEFEFE',
    color: '#AAAAAA',
    borderRadius: 6,
    fontSize: 16,
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
});