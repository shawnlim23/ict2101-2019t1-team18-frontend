import * as React from 'react';
import { Button,StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import Autoc from '../autocomplete';

class HomeScreen extends React.Component {  
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Autoc></Autoc>
          <TouchableOpacity style={styles.tabs} onPress={() => this.props.navigation.navigate('Details')}>
            <Text>More Details</Text>
          </TouchableOpacity>
          
        </View>
      );
    }
  }
  export default HomeScreen;
  const styles = StyleSheet.create({
    tabs: {
      backgroundColor:'skyblue',
      height: 40,
      width: '100%',
      borderTopRightRadius:10,
      borderTopLeftRadius:10,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })