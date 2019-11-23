import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class EditCanvas extends Component {

constructor(props){
    super(props);
    this.state={
        canvasID: ''
    }
}

componentDidMount(){
    const canvasID = this.props.navigation.getParam('canvasID')

}


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Edit Canvas Screen</Text>
      </View>
    );
  }
}

export default EditCanvas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  }
});