import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator} from 'react-native';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';

class LocationInformation extends React.Component {
    constructor(props){
        super(props);
        this.state={
          details:[], 
          photo1:[], 
          photo2:[], 
          photo3:[], 
          placeID:'',
          prevdata:''       
        }
      }
      componentDidMount(){        
        const placeID = this.props.navigation.getParam('placeID');
        this.setState({
            placeID: placeID
        })
        
      }

      
        async getData()
        {
            if(this.state.placeID!==this.state.prevdata)
            {
                try{
                    //console.log(this.state.placeID)
                    const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ this.state.placeID }&fields=name,rating,formatted_phone_number,photos&key=${GOOGLE_PLACES_API}`);
                    const data_response = await data.json();
                    //console.log("DATA : "+ data_response.result.name)
                    this.setState({            
                        details: data_response.result,
                        photo1:data_response.result.photos[0],
                        photo2:data_response.result.photos[1],
                        photo3:data_response.result.photos[2],
                        placeID:this.state.placeID,
                        prevdata:this.state.placeID
                    })
                    } catch(error) {
                        console.log(error)
                    }
            }
            
        }
  render() {
      this.getData();
    return ( 
         <View style={{flexDirection:'column'}}>  
             <View style={{ flexDirection:'row'}}>
              <Image style={{width:100, height: 100}}  
                source={this.state.photo1?{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight=100&photoreference=${this.state.photo1.photo_reference}&key=${GOOGLE_PLACES_API}`}:''}
                PlaceholderContent={<ActivityIndicator />}
                />
                <Image style={{width:100, height: 100}}  
                source={this.state.photo2?{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight=100&photoreference=${this.state.photo2.photo_reference}&key=${GOOGLE_PLACES_API}`}:''}
                PlaceholderContent={<ActivityIndicator />}
                />
                <Image style={{width:100, height: 100}}  
                source={this.state.photo3?{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&maxheight=100&photoreference=${this.state.photo3.photo_reference}&key=${GOOGLE_PLACES_API}`}:''}
                PlaceholderContent={<ActivityIndicator />}
                />
            </View>
             <Text>Name: {this.state.details.name}</Text>     
             <Text>Contact Number : {this.state.details.formatted_phone_number}</Text>          
        </View>    
    );
  }
}
export default LocationInformation;