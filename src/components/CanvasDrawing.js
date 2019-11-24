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
  Image
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RNFS from 'react-native-fs';

import RNSketchCanvas from '@shawn.lim/react-native-sketch-canvas';

class CanvasDrawing extends Component {

  constructor(props){
    super(props);

    this.state = {
      canvas: [],
      imgSourceBase64: ''

    }
  }

  componentDidMount(){
    let imgSrc = this.props.navigation.getParam('img').uri
    imgSrc = imgSrc.replace("content://com.ambletest.provider/root", "");
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

    this.props.navigation.navigate('AddCanvas', {path: this.state.path, imgSourceBase64: this.state.imgSourceBase64});

  }

    render() {
      let imgSrc = this.props.navigation.getParam('img').uri
      imgSrc = imgSrc.replace("content://com.ambletest.provider/root", "");

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

                        localSourceImage={ {filename: `${imgSrc}`, directory: '', mode: 'AspectFill'}}
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

export default CanvasDrawing;


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
    }
});