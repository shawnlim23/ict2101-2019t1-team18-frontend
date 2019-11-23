import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class AddCanvas extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Add Canvas Screen</Text>
      </View>
    );
  }
}

export default AddCanvas;

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