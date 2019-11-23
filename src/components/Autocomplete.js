import React, {Component} from 'react';
import {StyleSheet,Text,TextInput,View,ScrollView,ActivityIndicator,Button, Dimensions} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import {GOOGLE_PLACES_API} from 'react-native-dotenv';
import LocationItem from './LocationItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Autocomplete extends React.Component {
  

  state = {location: {},inputValue:'',SearchRes:[] }

  getDetails=(latlong,address) => {
      const updatedLatLong = latlong
      const inputValue= address
      console.log(inputValue)
      this.setState({
        location: updatedLatLong,
        inputValue:inputValue,
        SearchRes:[]
      });
      this.props.onNewDestination(this.state.location)
  }


  render() {

    return (
      <View style={styles.searchOverlay}>
        <GoogleAutoComplete apiKey={GOOGLE_PLACES_API} debounce={500} components={"country:sg"} minLength={3}>
          {({
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            inputValue,
            clearSearch
          }) => (
            <React.Fragment>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder={this.state.inputValue?this.state.inputValue:"Search a places"}
                  onChangeText={handleTextChange}
                  value={this.state.inputValue?this.state.inputValue:inputValue}
                />
              </View>
              {isSearching && <ActivityIndicator size="large" color="red" />}
              <ScrollView style={{width:Dimensions.get('window').width}}>                
                {/* if(locationResults!=={this.state.SearchRes})
                {
                  this.setState({SearchRes:locationResults})
                } */}
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
                    getDetails={this.getDetails}
                  />
                ))}
              </ScrollView>
            </React.Fragment>
          )}
        </GoogleAutoComplete>
      </View>
    );
  }
}
export default Autocomplete;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: '100%',
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor:'white'
  },
  inputWrapper: {
    marginTop: 5,
    flexDirection: 'row'
  },
  searchOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    flexDirection: 'column',
    flex: 1,
    alignItems:'center'
  }

});