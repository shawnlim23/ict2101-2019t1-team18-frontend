import React, {Component} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';

class LocationInformation extends React.Component {
    constructor(props){
        super(props);
        this.state={
          details:[], 
          placeID:''       
        }
      }
      componentDidMount(){        
        const placeID = this.props.navigation.getParam('placeID');
        this.setState({
            placeID: placeID
        })
      }

      
        // async getData()
        // {
        
        //     console.log("PLACES : "+ this.state.placeID)
        //     try{
        //         console.log('ASFDASDF')
        //         const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ this.state.placeID }&fields=name,rating,formatted_phone_number,photos&key=${GOOGLE_PLACES_API}`);
        //         const data_response = await data.json();
        //         console.log("DATA : "+ data_response.result)
        //         this.setState({            
        //             details: data_response.result,
        //             placeID:placeID
        //         })
        //         } catch(error) {
        //             console.log(error)
        //         }
            
        // }
  render() {
      //this.getData
    return ( 
         <View>            
        </View>    
    );
  }
}


export default LocationInformation;