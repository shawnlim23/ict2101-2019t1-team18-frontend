import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, Image, ScrollView, AsyncStorage, Button} from 'react-native';
import {BACKEND_SERVER} from 'react-native-dotenv';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';


class Profile extends Component {

  constructor(props){
    super(props);

    this.state = {
      name: '',
      sex: '',
      commute_method: '',
      birthday: '',
      editable: false,
      mode: 'date',
    }
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


  LogOut(){

    AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  }

  EditProfile(){
    this.props.navigation.navigate('EditProfile');
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
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.titleText}>
                Gender:
              </Text>
              <TextInput
                style={styles.name}
                autoCapitalize="none"
                placeholderTextColor='#808080'
                defaultValue={this.state.sex}
                editable={this.state.editable}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.titleText}>
                Birthday:
              </Text>
              <TextInput
                style={styles.name}
                autoCapitalize="none"
                placeholderTextColor='#808080'
                defaultValue={this.state.birthday}
                editable={this.state.editable}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.titleText}>
                Commute Method:
              </Text>
              <TextInput
                style={styles.name}
                autoCapitalize="none"
                placeholderTextColor='#808080'
                defaultValue={this.state.commute_method}
                editable={this.state.editable}
              />
            </View>

          </View>


          <View style={styles.cardBot}>
            <Text style={styles.cardTitle}>Achievements</Text>
            <Text> 428.2 - Kilometers walked</Text>
            <Text> 4 - Landmarks visited</Text>
            <Text> 6 - Canvases created</Text>
          </View>

          <View style={styles.photosCard}>
            <Text style={styles.cardTitle}>My Canvas</Text>
            <View style={styles.photosContainer}>
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
              <Image style={styles.photo} source={require('../assets/images/avatar.png')} />
            </View>
          </View>


          <View style={styles.profileButtons}>
            <Button onPress={() => {this.EditProfile()}} title="Edit Profile"></Button>
          </View>
          <View style={styles.profileButtons}>
            <Button onPress={() => {this.LogOut()}} title="Log Out"></Button>
          </View>

        </View>
      </ScrollView>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    backgroundColor : "#DCDCDC",
    backgroundColor: '#D3EDFF',
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
    padding: 0,
  },
  alignContainer: {
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    height: 130,
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
});