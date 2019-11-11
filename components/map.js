import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline, Marker, Circle } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_PLACES_API} from 'react-native-dotenv';


class map extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            loading: true,
            data: []
        };
    }


    async findNearbyPlaces(){

        const data = {
            key: GOOGLE_PLACES_API,
            latlng: this.state.latitude + ',' + this.state.longitude,
            radius: 500
        }

        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + data.key + '&location=' + data.latlng +'&radius=' + data.radius + '';


        let response = await fetch(url);
        let responseJSON = await response.json();
        let places = [];

        // while (responseJSON.next_page_token){

            responseJSON.results.map((place) => {

                places.push({
                    name: place.name,
                    lat: place.geometry.location.lat,
                    long: place.geometry.location.lng,
                    placeID: place.place_id
                })
            });


            this.setState({
                data: [this.state.data, ...places]
            })

            // this.setState({
            //     nearby_places: [...this.state.nearby_places, places]
            // })

            // this.setState({
            //     nearby_places: places
            // })

            // console.log(places);

            // const new_page_response = await fetch(url + '&pagetoken=' + responseJSON.next_page_token + '');
            // responseJSON = await new_page_response.json();
            // console.log(responseJSON);
        // }
        // this.setState({
        //     nearby_places: places
        // })

    }



    async requestPermission(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        console.log(granted);
       if (granted){
           Geolocation.watchPosition((position) => {

            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

           }, (error) => {
               console.log(error.code, error.message);
           },
           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
           )
       }
    }


    componentWillMount(){
       this.requestPermission();
    }


    componentDidUpdate(prevProps, prevState){

        if (prevState.latitude !== this.state.latitude && prevState.longitude !== this.state.longitude){
            this.findNearbyPlaces();
        }
    }



    // componentDidMount(){
    //     this.findNearbyPlaces();
    // }

    render(){

        const mapStyles = StyleSheet.create({
            map: {
                ...StyleSheet.absoluteFillObject,
            },
        });

        let initialRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }

        let my_location = {
            latitude: this.state.latitude,
            longitude: this.state.longitude
        }
        console.log(my_location);
        console.log(this.state.data);

        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={mapStyles.map}
                region={initialRegion}
                region={initialRegion}
            >

            <Marker coordinate = { my_location }>

            </Marker>


            {/* <Polyline
                coordinates={latlngs}
                strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[
                    '#7F0000',
                    '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000'
                ]}
                strokeWidth={6}
            /> */}
            </MapView>


        );
    }
};

export default map;
