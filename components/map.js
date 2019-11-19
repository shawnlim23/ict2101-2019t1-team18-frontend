import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import MapView,{ PROVIDER_GOOGLE, Polyline, Marker, Circle, Callout } from 'react-native-maps';
import polyUtil from 'polyline-encoded';
import {PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import { Icon } from 'react-native-elements'
// import RBSheet from "react-native-raw-bottom-sheet";
import RBS from './bottomsheet'




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
            started_journey: false,
            started_route: false,
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
            radius: 500
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


    async generateFMLM(dest){

        const startLoc = [this.state.latitude, this.state.longitude];
        const destinationLoc = [dest.lat, dest.long];

        if (!this.state.started_journey){

            try{
                const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?&key=${ GOOGLE_PLACES_API }&origin=${ startLoc }&destination=${ destinationLoc }&mode=${'transit'}&transit_mode=bus`)
                const resJson = await response.json();

                const steps = resJson.routes[0].legs[0].steps

                const journey_instructions = steps.map(step=>step.html_instructions).join('.');


                const first_mile = steps[0]
                const last_mile = steps[steps.length - 1]


                const overview_coordinates = polyUtil.decode(resJson.routes[0].overview_polyline.points).map(([latitude, longitude]) => ({
                    latitude,
                    longitude
                }));

                this.setState({
                    first_mile: first_mile,
                    last_mile: last_mile,
                    journey_coordinates: overview_coordinates,
                    instruction: journey_instructions,
                    started_journey: true
                })

            } catch(error) {
                console.log(error);
            }

        }else{

            this.setState({
                journey_coordinates: [],
                started_journey: false,
                first_mile: {},
                last_mile: {},
                completed_first: false,
                fm_coordinates: [],
                lm_coordinates: [],
                instruction: ''
            })
        }


    }



   startJourney(){
        if (!this.state.started_route){
             // Start Camera and diplay polyline
            this.animateCamera();

            const fm_coordinates = polyUtil.decode(this.state.first_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));

            const lm_coordinates = polyUtil.decode(this.state.last_mile.polyline.points).map(([latitude, longitude]) => ({
                latitude,
                longitude
            }));

            this.setState({
                fm_coordinates: fm_coordinates,
                lm_coordinates: lm_coordinates,
                started_route: true,
            })

            this.watchID = Geolocation.watchPosition((position) => {

                console.log(position);
                this.handleLocationChange(position);

                }, (error) => {
                    console.log(error.code, error.message);
                },
                {enableHighAccuracy: true, timeout: 20000, distanceFilter: 10, maximumAge: 1000}
            );
        }else{
            this.setState({
                fm_coordinates: [],
                lm_coordinates: [],
                first_mile: {},
                last_mile: {},
                started_route: false,
            })

            Geolocation.clearWatch(this.watchID);
        }
    }



    withinProximity(checkPoint, centerPoint, km){

        var ky = 40000 / 360;
        var kx = Math.cos(Math.PI * centerPoint.latitude / 180.0) * ky;
        var dx = Math.abs(centerPoint.longitude - checkPoint.longitude) * kx;
        var dy = Math.abs(centerPoint.latitude - checkPoint.latitude) * ky;
        return Math.sqrt(dx * dx + dy * dy) <= km;

    }


    async animateCamera(){
        this.map.animateCamera(
            {
               center : { latitude: this.state.latitude, longitude: this.state.longitude },
               heading: 90,
               zoom: 20
            },
            { duration: 750 }
        );
    }


    async requestPermission(){
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        console.log(granted);
       if (granted){
           Geolocation.getCurrentPosition((position) => {
            this.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });

           }, (error) => {
               console.log(error.code, error.message);
           },
           {enableHighAccuracy: true, timeout: 1000}
           )
       }
    }



    componentDidMount(){
       this.requestPermission();
    }


    componentWillUnmount(){
        Geolocation.clearWatch(this.watchID);
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

            if (this.withinProximity(start_point, current, 0.02)){

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


    // setRef(ref){
    //     console.log(ref);
    //     this.RBS = ref;
    // }


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

            <Polyline
                    coordinates={this.state.journey_coordinates}
                    strokeWidth={3}
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
                {!this.state.started_route ? (<Button color="#ff5c5c" title={this.state.started_journey ? "Cancel Journey" : "Start Journey"} onPress={() => this.generateFMLM({lat: 1.3553794, long: 103.8677444 })}></Button>) : null}
                {this.state.started_journey ? (<Button title={this.state.started_route ? "Cancel Route" : "Start Route" } color="#009688" onPress={() => this.startJourney()}></Button>) : null}
            </View>


            <RBS name={this.state.rbs_data.name}
                updateRoute={this.updateRoute.bind(this)}
                location={this.state.rbs_data.location}
                placeID={this.state.rbs_data.placeID}
                isProximity={this.state.rbs_data.isProximity}
                started_route={this.state.started_route}
                setRef={(ref) => {this.rbs = ref}}
            />


        </View>

        );
    }
};

export default map;
