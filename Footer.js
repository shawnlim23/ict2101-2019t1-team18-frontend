import React from 'react';
import {StyleSheet,Text,View,Button} from 'react-native';
export default class Footer extends React.Component{
  render(){
    return(
      
        <View style={styles.footer}>
          <Button title="-" style={styles.btn}/>
        </View>
    )
  }
}

const styles= StyleSheet.create({
 footer:{
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
    height:10,
  },
  btn:{
      height:10,
  },
});