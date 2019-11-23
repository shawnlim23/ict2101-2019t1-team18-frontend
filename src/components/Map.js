import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline, Marker, Circle, Callout } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import {PermissionsAndroid, ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import { Icon } from 'react-native-elements'
import {isEmpty} from "lodash"
import RBS from './bottomsheet'
import Autocomplete from './Autocomplete'
import Accordion from 'react-native-collapsible/Accordion';



class map extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            destination: {},
            enter_selection: false,
            started_journey: false,
            started_route: false,
            journey_coordinates: [],
            fm_coordinates: [],
            lm_coordinates: [],
            instruction: '',
            steps: []
        };

    }


    async startJourney(dest){

        const startLoc = [this.state.latitude, this.state.longitude];
        const destinationLoc = [dest.lat, dest.long];

        if (!this.state.started_journey){

            try{
                const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?&key=${ GOOGLE_PLACES_API }&origin=${ startLoc }&destination=${ destinationLoc }&mode=${'transit'}&transit_mode=bus`)
                const resJson = await response.json();
                const steps = resJson.routes[0].legs[0].steps
                const journey_instructions = steps.map(step=>step.html_instructions).join('->');

                const overview_coordinates = polyUtil.decode(resJson.routes[0].overview_polyline.points).map(([latitude, longitude]) => ({
                    latitude,
                    longitude
                }));
                this.setState({
                    journey_coordinates: overview_coordinates,
                    instruction: journey_instructions,
                    steps: steps,
                    started_journey: true
                })

            } catch(error) {
                console.log(error);
            }

        }else{

            this.setState({
                journey_coordinates: [],
                started_journey: false,
                steps: [],
                instruction: '',
                fm_coordinates: [],
                lm_coordinates: [],
                destination: {},
                enter_selection: false,
                started_route: false
            })
        }
    }


    async displayRoute(){

        if (!this.state.started_route){
            const first_mile = this.state.steps[0]
            const last_mile = this.state.steps[this.state.steps.length - 1]

            const fm_coordinates = polyUtil.decode(first_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
                }));

            const lm_coordinates = polyUtil.decode(last_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));

            this.setState({
                fm_coordinates: fm_coordinates,
                lm_coordinates: lm_coordinates,
                started_route: true,
                enter_selection: false
            })
        }else{
            this.setState({
                fm_coordinates: [],
                lm_coordinates: [],
                started_route: false,
                enter_selection: true
            })
        }
    }
    startRoute(){
        this.props.navigation.navigate('Route', {steps: this.state.steps});
    }
    async requestPermission(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
       if (granted){
           Geolocation.getCurrentPosition((position) => {
            console.log(position);
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

           }, (error) => {
               console.log(error.code, error.message);
           },
           {enableHighAccuracy: true, timeout: 15000}
           )
       }
    }

    componentDidMount(){
       this.requestPermission();
    }


    componentWillUnmount(){
        Geolocation.clearWatch(this.watchID);
    }

    getDestination = (latlong) =>{
        const destination = latlong;
       this.setState({
           destination: {
               lat: destination.latitude,
               long: destination.longitude,
           },
           enter_selection: true
       })
    }

    render(){

        const mapStyles = StyleSheet.create({
            map: {
                ...StyleSheet.absoluteFillObject,
            },
            container: {
                height: 80,
                width: '100%',
                borderWidth: 1,
                position: 'absolute',
                flexDirection: 'column',
                flex: 1,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems:'center'
            },
            text: {
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 15,
            }
        });

        let initialRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }


        return (
            <View style={{ flex: 1 }}>


            <MapView
                provider={PROVIDER_GOOGLE}
                ref={ref => {
                    this.map = ref;
                }}
                style={mapStyles.map}
                region={initialRegion}
                loadingEnabled={true}
                moveOnMarkerPress={false}
                followsUserLocation={true}
                showsUserLocation={true}
                showsCompass={false}
                zoomEnabled={true}
                showsPointsOfInterest = {false}
            >

           {!isEmpty(this.state.destination) ? (<MapView.Marker
                coordinate = {{
                    latitude: this.state.destination.lat,
                    longitude: this.state.destination.long
                }}
            >
            </MapView.Marker>) : null }


            <Polyline
                    coordinates={this.state.journey_coordinates}
                    strokeColor="blue"
                    strokeWidth={6}
            />

            <Polyline
                    coordinates={this.state.fm_coordinates}
                    strokeColor="red"
                    strokeWidth={10}
            />

            <Polyline
                    coordinates={this.state.lm_coordinates}
                    strokeColor="red"
                    strokeWidth={10}
            />



            </MapView>

            {!isEmpty(this.state.destination) && this.state.started_journey ? <View style={mapStyles.container}>
                <Text style={mapStyles.text}>{this.state.instruction}</Text>
            </View> : <Autocomplete
                onNewDestination={this.getDestination}
            />}

             <View style ={{
                    flex: 1,
                    justifyContent: 'center',
                    width: '95%',
                    bottom: 0,
                    position: 'absolute',
                    margin: 10,
                    padding: 20,
                    borderRadius: 15
                }}>
                {this.state.enter_selection ? (<Button color={!this.state.started_journey ?"#ff5c5c" : "#009688"} title={!this.state.started_journey ? "Enter" : "Cancel"} onPress={() => this.startJourney(this.state.destination)}></Button>) : null}
                {this.state.started_journey ? (<Button color="#ff5c5c" title={!this.state.started_route ? "Start Journey" : "Cancel Journey"} onPress={() => this.displayRoute()}></Button>) : null}
                {this.state.started_route ? (<Button title="Start Route" color="#009688" onPress={() => this.startRoute()}></Button>) : null}
            </View>

        </View>

        );
    }
};

export default map;