import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline, Marker, Circle } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_PLACES_API, GOOGLE_DIRECTIONS_API} from 'react-native-dotenv';
import MapViewDirections from 'react-native-maps-directions';

class map extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            loading: true,
            data: [],
            first_mile: {},
            last_mile: {},
            fm_polyline: [],
            lm_polyline: []

        };
    }

    // WIP
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






    createJourney(dest){

        return (<MapViewDirections
        origin = {{latitude: this.state.latitude, longitude: this.state.longitude}}
        destination = {{ latitude: dest.lat, longitude: dest.long }}
        apikey = {GOOGLE_PLACES_API}
        mode = {"TRANSIT"}
        strokeWidth = {3}
        >
        </MapViewDirections>)
    }


    async generateFMLM(dest){

        const startLoc = [this.state.latitude, this.state.longitude];
        const destinationLoc = [dest.lat, dest.long];

        try{
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?&key=${ GOOGLE_PLACES_API }&origin=${ startLoc }&destination=${ destinationLoc }&mode=${'transit'}`)
            const resJson = await response.json();

            const steps = resJson.routes[0].legs[0].steps
            const first_mile = steps[0]
            const last_mile = steps[steps.length - 1]

            const fm_coordinates = polyUtil.decode(first_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));


            const lm_coordinates = polyUtil.decode(last_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));

            this.setState({
                first_mile: first_mile,
                last_mile: last_mile,
                fm_polyline: fm_coordinates,
                lm_polyline: lm_coordinates
            })

        } catch(error) {
            console.log(error);
        }

    }


    inGeoFence(checkPoint, centerPoint, km){

        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
        var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
        var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
        console.log(Math.sqrt(dx * dx + dy * dy) <= km)
        return Math.sqrt(dx * dx + dy * dy) <= km;

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

            this.generateFMLM({lat: 1.3553794, long: 103.8677444});
        }

    }



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

        const journey = this.createJourney({lat: 1.3553794, long: 103.8677444})


        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={mapStyles.map}
                region={initialRegion}
                loadingEnabled = {true}
                moveOnMarkerPress = {false}
                showsUserLocation={true}
                showsCompass={true}
                showsPointsOfInterest = {false}
            >

            <Polyline
                    coordinates={this.state.fm_polyline}
                    strokeColor="red"
                    strokeWidth={10}
            />

            <Polyline
                    coordinates={this.state.lm_polyline}
                    strokeColor="red"
                    strokeWidth={10}
            />


            {journey}

            {this.state.data.map((location) => {
                if (location.lat && location.long){
                    return <MapView.Marker
                        coordinate = {{
                            latitude: location.lat,
                            longitude: location.long
                        }}
                        onPress = {() => {this.inGeoFence(
                            {latitude: location.lat, longitude: location.long},
                            {latitude: this.state.latitude, longitude: this.state.longitude},
                            0.05
                        )}}
                    />
                }
                return null;
            })}

            {this.state.data.map((location) => {
                if (location.lat && location.long){
                    return <MapView.Circle
                        center = {{
                            latitude: location.lat,
                            longitude: location.long
                        }}
                        radius = {50}
                        fillColor = {'rgba(230,238,255,0.5)'}
                    />
                }
                return null;
            })}






            </MapView>


        );
    }
};

export default map;
