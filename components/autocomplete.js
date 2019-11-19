import React, {Component} from 'react';
import {StyleSheet,Text,TextInput,View,ScrollView,ActivityIndicator,Button} from 'react-native';
import {GoogleAutoComplete} from 'react-native-google-autocomplete';
import {API_KEY} from '../key';
import LocationItem from './LocationItem';

class Autoc extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <GoogleAutoComplete apiKey={API_KEY} debounce={500} components={"country:sg"} minLength={3}>
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
              <ScrollView style={{width:350}}>
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
    height: 40,
    width: 300,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  inputWrapper: {
    marginTop: 80,
    flexDirection: 'row'
  },
});
