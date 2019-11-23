import React, { PureComponent } from 'react';
import { View, Alert, Text, StyleSheet, TouchableOpacity } from 'react-native';

class LocationItem extends PureComponent {


  _handlePress = async () => {
    const res = await this.props.fetchDetails(this.props.place_id)
    this.props.getDetails({ latitude: res.geometry.location.lat, longitude: res.geometry.location.lng},res.formatted_address)
    
    //console.log(res.formatted_address)
    // console.log('Lat:', res.geometry.location.lat)
    // console.log('Lng', res.geometry.location.lng)
  }
  render() {
    return (
      
      <TouchableOpacity style={styles.root} onPress={this._handlePress}>
        <Text>{this.props.description}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: 40,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    backgroundColor:'white'
  }
})

export default LocationItem;