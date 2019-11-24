import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TextInput,
  Image,
  AsyncStorage
} from 'react-native';

import {BACKEND_SERVER} from 'react-native-dotenv';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import fetch_blob from 'react-native-fetch-blob';
import RNFS from 'react-native-fs';

import RNSketchCanvas from '@shawn.lim/react-native-sketch-canvas';

class UpdateCanvasDrawing extends Component {

  constructor(props){
    super(props);

    this.state = {
      canvas: [],
      imgSourceBase64: ''
      
    }
  }

  async getCanvasDrawingDetails(){

    const id = await AsyncStorage.getItem('USER_ID');

    const canvasId = 1;

    const getCanvasDrawing = await fetch('http://' + BACKEND_SERVER + `/amble/canvas/image/${ canvasId }`);

    const getCanvasDrawingJson = await getCanvasDrawing.json();

    const img = 'data:image/png;base64,' + getCanvasDrawingJson.result.image

    const fs = fetch_blob.fs
    const dirs = fetch_blob.fs.dirs 

    let filename = String(Math.ceil(Math.random() * 100000000))

    const file_path = dirs.PictureDir + "/" + filename + ".png"
    // Test under 'Samsung Galaxy Note 5'
    // console.log(dirs.DocumentDir) // /data/user/0/com.bigjpg/files
    // console.log(dirs.CacheDir)    // /data/user/0/com.bigjpg/cache
    // console.log(dirs.DCIMDir)     // /storage/emulated/0/DCIM
    // console.log(dirs.DownloadDir) // /storage/emulated/0/Download
    // console.log(dirs.PictureDir)  // /storage/emulated/0/Pictures

    console.log(file_path + " this is file path")
    
    var image_data = img.split('data:image/png;base64,');
    image_data = image_data[1];
    
    RNFS.writeFile(file_path, image_data, 'base64')
    .catch((error) => {
      alert(JSON.stringify(error));
    });

    let location = "/storage/emulated/0/Pictures/" + filename + ".png"

    this.setState({
      dbDrawing: img,
      location: location/*
      name: getCanvasDrawingJson.name,
      sex: getCanvasDrawingJson.sex,
      commute_method: getCanvasDrawingJson.commute_method.toString(),
      birthday: getCanvasDrawingJson.birthdate,
      date: moment(getCanvasDrawingJson.birthdate, "DD/MM/YYYY").toDate() */
    })

    console.log(this.state.location + "wuh")

    //console.log("test")
    //console.log(getCanvasDrawingJson.result.image)
    //console.log(this.state.dbDrawing)

  }

  componentDidMount(){

    this.getCanvasDrawingDetails();

    //let imgSrc = this.props.navigation.getParam('img').uri
    //imgSrc = imgSrc.replace("content://com.ambletest.provider/root", "");
    //console.log(imgSrc)
    // LOG  content://com.ambletest.provider/root/storage/emulated/0/Pictures/image-2bca3925-9d82-4538-b52d-85e0cdbb436c.jpg

    // LOG  content://com.ambletest.provider/root/storage/emulated/0/Pictures/RNSketchCanvas/94108260.png
  }

  getImg = async (path) => {
    console.log("heyheyhey")

    //console.log(path)

    let base64image = await RNFS.readFile(path, 'base64');

    const img = 'data:image/png;base64,' + base64image


    this.setState({
      imgSourceBase64: base64image,
      path: path
    });



    //console.log(img + " this is imggggGGGGGG")

    this.props.navigation.navigate('UpdateCanvas', {path: this.state.path, imgSourceBase64: this.state.imgSourceBase64});

  }

    render() {
      //let imgSrc = this.props.navigation.getParam('img').uri
      //imgSrc = imgSrc.replace("content://com.ambletest.provider/root", "");
//                  <Image style={styles.cardImage} source={{ uri: `${this.state.dbDrawing}`}} />

        return (
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <RNSketchCanvas
                        ref={ref => this.canvas = ref}
                        containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
                        defaultStrokeIndex={0}
                        defaultStrokeWidth={5}
                        closeComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Close</Text></View>}
                        undoComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Undo</Text></View>}
                        clearComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Clear</Text></View>}
                        eraseComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Eraser</Text></View>}
                        strokeComponent={color => (<View style={[{ backgroundColor: color }, styles.strokeColorButton]} />)}
                        strokeSelectedComponent={(color, index, changed) => {return (<View style={[{ backgroundColor: color, borderWidth: 2 }, styles.strokeColorButton]} />)}}
                        strokeWidthComponent={(w) => {
                            return (<View style={styles.strokeWidthButton}>
                            <View  style={{
                                backgroundColor: 'white', 
                                marginHorizontal: 2.5,
                                width: Math.sqrt(w / 3) * 10,
                                height: Math.sqrt(w / 3) * 10,
                                borderRadius: Math.sqrt(w / 3) * 10 / 2
                            }}/>
                            </View>
                        )}}

                        localSourceImage={ {filename: `${this.state.location}`, directory: '', mode: 'AspectFill'}}
                        saveComponent={<View style={styles.functionButton}><Text style={{color: 'white'}}>Save</Text></View>}
                          savePreference={() => {
                            return {
                              folder: 'RNSketchCanvas',
                              filename: String(Math.ceil(Math.random() * 100000000)),
                              transparent: true,
                              imageType: 'png',
                              includeImage: true,
                              includeText: false,
                              cropToImageSize: true
                            }
                          }}
                        onSketchSaved={(success, path) => {
                          Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
                          this.getImg(path)

                        }}
                    />
                </View>
            </View>
        );
    }
}

export default UpdateCanvasDrawing;


const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF',
    },
    strokeColorButton: {
        marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
    },
    strokeWidthButton: {
        marginHorizontal: 2.5, marginVertical: 8, width: 30, height: 30, borderRadius: 15,
        justifyContent: 'center', alignItems: 'center', backgroundColor: '#39579A'
    },
    functionButton: {
        marginHorizontal: 2.5, marginVertical: 8, height: 30, width: 60,
        backgroundColor: '#39579A', justifyContent: 'center', alignItems: 'center', borderRadius: 5,
    },
    cardImage:{
    flex: 1,
    height: 400,
    width: 200,
  },
});