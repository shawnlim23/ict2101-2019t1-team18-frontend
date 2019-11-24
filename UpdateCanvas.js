import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  Picker,
  TextInput,
  Modal,
  TouchableHighlight
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';


const options ={
    title: 'Canvas',
    takePhotoButtonTitle: 'Capture Image',
    chooseFromLibraryButtonTitle: 'Select Image',
  }

class CreateCanvas extends Component {

  /*state = {
    canvasTitle: 'Canvas Title',
    canvasDescription: 'Canvas Description',
    canvasEditPerms: '0',
  }*/

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:8, title: "Ridiculus mus. Donec quam", time:"2018-06-12 12:44 pm", image:"https://lorempixel.com/400/200/nature/3/", description:"Lorem ipsum  sit amet, consectetuer adipiscing elit.  commodo ligula..."},
      ],
      createdDrawing: '',
      convertedBase64: '',
      modalVisible: false,
      canvasTitle: 'Canvas Title',
      canvasDescription: 'Canvas Description',
      canvasEditPerms: '0',
    };
  }

  takePic=()=>{
    console.log("clicked")
  //alert('clicked');
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          imgSource: source,
        });
      }

      this.props.navigation.navigate('CanvasDrawing', {img: this.state.imgSource});

      console.log("passing img url")
      //console.log(this.state.imgSource.uri)
    });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  Submit = async () => {
    const imgPath = this.props.navigation.getParam('path')

    const convertedBase64 = await RNFS.readFile(imgPath, 'base64');

    const img = 'data:image/png;base64,' + this.state.convertedBase64

    this.setState({
      convertedBase64: convertedBase64,
      createdDrawing: img
    });

    const { placeID, canvasTitle, canvasDescription, canvasEditPerms, createdDrawing } = this.state
    try {

      const id = await AsyncStorage.getItem('USER_ID');

      const canvasId = 1;

      const createCanvas_response = await fetch('http://' + BACKEND_SERVER + `/amble/canvas/image/${ canvasId }`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //userID: id,
          //placeID: placeID,
          //title: canvasTitle,
          //description: canvasDescription,
          file: createdDrawing
        })
      });

      const createCanvas_json = await createCanvas_response.json();
      //console.log(createCanvas_json.result)
      if (createCanvas_json.result === "success"){
        this.setModalVisible(true);
        //this.props.navigation.navigate('App');
        console.log('updated successfully')
      }else{
        //this.props.navigation.navigate('SignUp');
      }
    } catch (err) {
      console.log('error:', err)
    }


  }

  componentDidMount(){
      this.getCanvasDrawingDetails();
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList style={styles.list}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return (
              <View style={styles.separator}/>
            )
          }}
          renderItem={(post) => {
            const item = post.item;
            return (
              <View style={styles.card}>
                <View style={styles.titleContainer}>
                  <Text style={styles.titleText2}>Canvas Creation</Text>
                </View>

                <Text style={styles.titleText3}>Take a picture: </Text>

                <TouchableOpacity onPress={this.takePic}>
                  <View style={styles.socialBarContainer}>
                    <View style={styles.socialBarSection}>
                      <TouchableOpacity style={styles.socialBarButton} onPress={this.takePic}>
                        <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-filled/96/000000/camera.png'}}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>




                <View style={styles.cardHeader}>
                  <View>


                    <Text style={styles.titleText}>
                      Canvas Title:
                    </Text>
                    <TextInput
                      style={styles.name}
                      autoCapitalize="none"
                      placeholderTextColor='#808080'
                      defaultValue=""
                      onChangeText={val => this.onChangeText('canvasTitle', val)}
                    />


                    <Text style={styles.titleText}>
                      Canvas Description:
                    </Text>
                    <TextInput
                      style={styles.name}
                      multiline={true}
                      numberofLines={4}
                      autoCapitalize="none"
                      placeholderTextColor='#808080'
                      defaultValue=""
                      onChangeText={val => this.onChangeText('canvasDescription', val)}
                    />

                    <View style={styles.timeContainer}>


                      <Text style={styles.titleText}>
                        Edit permissions:
                      </Text>
                      <View style={styles.pickerContainer}>
                        <Picker
                          selectedValue={this.state.canvasEditPerms}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({canvasEditPerms: itemValue})
                          }>
                          <Picker.Item label="Only for self" value="0" />
                          <Picker.Item label="Open to public" value="1" />
                        </Picker>
                      </View>


                    </View>
                  </View>
                  

                </View>
                <View style={styles.cardFooter}>
                  <View style={styles.profileButtons}>
                    <Button onPress={() => {this.Submit()}} title="Update Canvas"></Button>
                  </View>
                </View>

                <Image style={styles.cardImage} source={{ uri: `${this.state.createdDrawing}`}} />


                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                    }}>
                    <View style={styles.successModal}>
                      <View>
                        <Text>Canvas successfully created!</Text>

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

            )
          }}/>
      </View>
    );
  }
}

export default CreateCanvas;


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#E6E6E6",
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
    backgroundColor:"white",
  },
  cardImage:{
    flex: 1,
    height: 150,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
  },
  time:{
    fontSize:13,
    color: "#808080",
    marginTop: 5
  },
  icon: {
    width:40,
    height:40,
  },
  iconData:{
    width:15,
    height:15,
    marginTop:5,
    marginRight:5
  },
  timeContainer:{
    flexDirection:'row',
    paddingTop: 10
  },
  profileButtons:{
    flex: 1
  },
  pickerContainer: {
    width: 200,
    backgroundColor: '#FEFEFE',
    color: '#AAAAAA',
    borderRadius: 6,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  titleText: {
    marginTop: 15,
    fontSize: 16,
    padding: 0,
  },
  name:{
    fontSize:16,
    color:"#808080",
    paddingTop: 12,
    backgroundColor: '#EEE',
    width: 290    
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#CCC',
    padding: 20
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    fontSize: 20,
    padding: 10,
  },
  titleText2: {
    fontSize: 20,
    padding: 5,
  },
  titleText3: {
    fontSize: 16,
    paddingLeft: 20
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