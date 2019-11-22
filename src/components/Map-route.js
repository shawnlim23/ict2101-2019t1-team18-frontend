import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline, Marker, Circle, Callout } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import { Icon } from 'react-native-elements'
import {isEmpty} from "lodash"
import RBS from './bottomsheet'
import Autocomplete from './Autocomplete'




class Route extends React.Component{

    constructor(props){

        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            loading: true,
            data: [],
            first_mile: {},
            last_mile: {},
            completed_first: false,
            journey_coordinates: [],
            fm_coordinates: [],
            lm_coordinates: [],
            instruction: '',
            rbs_data: { isOpen: false }
        };
        this.rbs = React.createRef();

    }



    async findNearbyPlaces(){

        const data = {
            key: GOOGLE_PLACES_API,
            latlng: this.state.latitude + ',' + this.state.longitude,
            radius: 200
        }

        const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=' + data.key + '&location=' + data.latlng +'&radius=' + data.radius + '';
        let response = await fetch(url);
        let responseJSON = await response.json();
        let places = [];
        responseJSON.results.map((place) => {

            places.push({
                name: place.name,
                lat: place.geometry.location.lat,
                long: place.geometry.location.lng,
                placeID: place.place_id,
                rating: place.rating ? place.rating : 0
            })
        });
        this.setState({
            data: [this.state.data, ...places]
        })

    }

   duringRoute(){
        this.watchID = Geolocation.watchPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })

            this.handleLocationChange(position);

            }, (error) => {
                console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 20000, distanceFilter: 10, maximumAge: 1000}
        );

    }


    handleLocationChange(current_location){
        const current = { latitude: current_location.coords.latitude, longitude: current_location.coords.longitude }
        if (this.state.completed_first === false) {
            this.checkRouteState(current, this.state.first_mile, 'first mile');
        }else{
            this.checkRouteState(current, this.state.last_mile, 'last_mile');
        }
       }


    checkRouteState(current, mile, mile_name){

        const end_mile = { latitude: mile.end_location.lat, longitude: mile.end_location.lng }
        mile.steps.forEach((step) => {
            const start_point = {latitude: step.start_location.lat, longitude: step.start_location.lng }

            if (this.withinProximity(start_point, current, 0.05)){
                const index = mile.steps.findIndex((stepIndex) => stepIndex === step);
                const regex = /(<([^>]+)>)/ig;
                const formatted_instructions = step.html_instructions.replace(regex, '');

                this.setState({
                    instruction: formatted_instructions
                })
                mile.steps.slice(index, 1);
            }

            if (this.withinProximity(end_mile, current, 0.02)) {
                this.setState({
                    instruction: 'You have completed the ' + mile_name + ' journey',
                    completed_first: true
                })
            }
        })
    }

    withinProximity(checkPoint, centerPoint, km){

        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
        var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
        var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;

    }




    componentDidMount(){

       const steps = this.props.navigation.getParam('steps');
       const first_mile = steps[0]
       const last_mile = steps[steps.length - 1]

        this.setState({
            latitude: first_mile.start_location.lat,
            longitude: first_mile.start_location.lng
        })

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
            fm_coordinates: fm_coordinates,
            lm_coordinates: lm_coordinates
        })
        this.duringRoute();

    }


    componentWillUnmount(){
        Geolocation.clearWatch(this.watchID);
    }

    cancelRoute(){
        this.setState({
            first_mile: [],
            last_mile: [],
            fm_coordinates: [],
            lm_coordinates:[],
            completed_first: false
        })
        this.props.navigation.goBack();
    }


    animateCamera(){
        this.map.animateCamera(
            {
               center : { latitude: this.state.latitude, longitude: this.state.longitude },
               heading: 90,
               zoom: 20
            },
            { duration: 750 }
        );
    }



    componentDidUpdate(prevProps, prevState){
        if (prevState.latitude != this.state.latitude && prevState.longitude !== this.state.longitude){
            this.findNearbyPlaces();
        }
    }


    async updateRoute(waypoint, placeID){

        const start = [this.state.latitude, this.state.longitude];
        const end = this.state.completed_first ?
        [this.state.last_mile.end_location.lat, this.state.last_mile.end_location.lng] : [this.state.first_mile.end_location.lat, this.state.first_mile.end_location.lng ]

        console.log(waypoint);

        try{
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?&key=${ GOOGLE_PLACES_API }&origin=${ start }&destination=${ end }&mode=${'walking'}&waypoints=${ waypoint }`)
            const responseJSON = await response.json();

            const coordinates = polyUtil.decode(responseJSON.routes[0].overview_polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));

            const steps = responseJSON.routes[0].legs[0]
            this.state.completed_first ? this.setState({ lm_coordinates: coordinates, last_mile: steps }) : this.setState({ fm_coordinates: coordinates, first_mile: steps })
            const post_location = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/' + placeID)
            const post_location_json = await post_location.json();

            console.log(post_location_json)

        } catch(error){
            console.log(error);
        }


    }


    displayBottomSheet(name, placeID, latlong, isProximity) {

        this.rbs.open();
        // this.RBS.open();
        const rbs_data = {
            name: name,
            placeID: placeID,
            location: latlong,
            isProximity: isProximity
        }
        this.setState({
            rbs_data: rbs_data
        })
    }




    render(){
        const mapStyles = StyleSheet.create({
            map: {
                ...StyleSheet.absoluteFillObject,
            },
            button: {
                width: 150,
                backgroundColor: "#4EB151",
                paddingVertical: 10,
                alignItems: "center",
                borderRadius: 3,
                margin: 10,
                flexDirection: "row",
            }
        });

        let initialRegion = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
        console.log(initialRegion);

        return (
            <View style={{ flex: 1 }}>


            <MapView
                provider={PROVIDER_GOOGLE}
                ref={ref => {
                    this.map = ref;
                }}
                style={mapStyles.map}
                loadingEnabled={true}
                moveOnMarkerPress={false}
                followsUserLocation={true}
                showsUserLocation={true}
                showsCompass={false}
                zoomEnabled={true}
                // region={initialRegion}
                onMapReady={() => this.animateCamera()}
                // scrollEnabled={false}
                // rotateEnabled={false}
                // initialCamera= {initialCamera}
                showsPointsOfInterest = {false}
            >

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

            {!isEmpty(this.state.first_mile) ? (<MapView.Marker
                 coordinate = {{
                    latitude: this.state.first_mile.end_location.lat,
                    longitude: this.state.first_mile.end_location.lng
                }}
                pinColor = {'blue'}
            />) : null }

            {!isEmpty(this.state.first_mile) ? (<MapView.Marker
                 coordinate = {{
                    latitude: this.state.last_mile.end_location.lat,
                    longitude: this.state.last_mile.end_location.lng
                }}
                pinColor = {'blue'}
            />) : null }





            {this.state.data.map((location) => {
                if (location.lat && location.long){

                    const isProximity = this.withinProximity({latitude: location.lat, longitude: location.long},
                    {latitude: this.state.latitude, longitude: this.state.longitude}, 0.1);

                    const landmark_location = [location.lat, location.long];

                    return <MapView.Marker
                        coordinate = {{
                            latitude: location.lat,
                            longitude: location.long
                        }}
                        onPress={() => {this.displayBottomSheet(location.name, location.placeID, landmark_location, isProximity)}}

                    >
                    </MapView.Marker>
                }
                return null;
            })}

            </MapView>

            <View style={{
                flexDirection: 'row',
                height: 100,
                padding: 20,
                backgroundColor: "#f44336",
                borderRadius: 10,
                opacity: 10,
                elevation: 10
            }}>

                <Text style={{color: 'white', fontSize: 20}} lineHeight={3} >{this.state.instruction}</Text>
            </View>


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
              <Button color="#ff5c5c" title="Cancel Route" onPress={() => this.cancelRoute()}></Button>

            </View>


            <RBS name={this.state.rbs_data.name}
                updateRoute={this.updateRoute.bind(this)}
                location={this.state.rbs_data.location}
                placeID={this.state.rbs_data.placeID}
                isProximity={this.state.rbs_data.isProximity}
                setRef={(ref) => {this.rbs = ref}}
            />


        </View>

        );
    }
};

export default Route;
