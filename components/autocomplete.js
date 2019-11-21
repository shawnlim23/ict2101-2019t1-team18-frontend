import React, {Component} from 'react';
import {StyleSheet,Text,TextInput,View,ScrollView,ActivityIndicator,Button,Dimensions} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import LocationItem from './LocationItem';
import {GOOGLE_PLACES_API} from 'react-native-dotenv';
import {API_KEY} from '../key';

class Autoc extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoogleAutoComplete apiKey={GOOGLE_PLACES_API} debounce={500} components={"country:sg"} minLength={3}>
          {({
            handleTextChange,
            locationResults,
            fetchDetails,
            isSearching,
            inputValue,
            clearSearchs
          }) => (
            <React.Fragment>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search a places"
                  onChangeText={handleTextChange}
                  value={inputValue}
                />
                <Button title="Clear" onPress={clearSearchs} />
              </View>
              {isSearching && <ActivityIndicator size="large" color="red" />}
              <ScrollView style={{width:Dimensions.get('window').width}}>
                {locationResults.map(el => (
                  <LocationItem
                    {...el}
                    key={el.id}
                    fetchDetails={fetchDetails}
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
export default Autoc;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: '100%',
    width: '80%',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginTop: 5,
    flexDirection: 'row'
  },
});
