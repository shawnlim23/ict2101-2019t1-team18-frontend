'use strict';
import React, { PureComponent } from 'react';
import { Image, AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const options ={
  title: 'Canvas',
  takePhotoButtonTitle: 'Capture Image',
  chooseFromLibraryButtonTitle: 'Select Image',
}

export default class camera extends PureComponent<{}> {
  constructor(props){
    super(props);
    this.state={
      avatarSource: null
    }
  }
myfun=()=>{
  //alert('clicked');
  ImagePicker.showImagePicker(options, (response) => {
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
        avatarSource: source,
      });
    }
  });
}
  
  render() {
    return (
      <View style={styles.container}>
        <Image source={this.state.avatarSource}
        style={{width:'100%',height:300,margin:10}}/>
        <Text>Welcome</Text>
        <TouchableOpacity style={{backgroundColor:'green', alignItems: 'center', width:200, height:50, margin: 100, padding: 10}}
        onPress={this.myfun}>
          <Text style={{color:'#fff'}}>Select Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});

AppRegistry.registerComponent('App', () => camera);