import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator,AsyncStorage,TouchableOpacity, Dimensions,ScrollView} from 'react-native';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import { Card, ListItem, Button, Rating } from 'react-native-elements'
import Icon from "react-native-vector-icons/FontAwesome";
import ActionButton from 'react-native-action-button';



class LocationInformation extends React.Component {
    constructor(props){
        super(props);
        this.state={
            details:[],
            photo1:[],
            photo2:[],
            photo3:[],
            placeID:'',
            prevdata:'',
            isProximity: false,
            canvases: []
        }
      }
      componentDidMount(){
        const placeID = this.props.navigation.getParam('placeID');
        const isProximity = this.props.navigation.getParam('isProximity');
        const rating = this.props.navigation.getParam('rating');
        this.setState({
            placeID: placeID,
            isProximity: isProximity,
            rating: rating
        })


        this.getCanvases(placeID).then((placeCanvases) => {
            this.setState({
                canvases: [...placeCanvases]
            })
        })



      }




    async getCanvases(placeID){

        const landmark = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/' + placeID + '/canvases');
        const landmark_response = await landmark.json();
        const canvases = landmark_response.canvases;

        const placeCanvases = canvases.map((canvas) =>{ return {
            id: canvas.canvasID,
            userID: canvas.userID,
            title: canvas.title,
            description: canvas.description,
            image: canvas.image,
            rating: canvas.rating
        }})

        return placeCanvases;
    }




    async rateCanvas(canvasID, userID){
        console.log(canvasID);
        console.log(userID);
        const settings = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              canvasID: canvasID,
              userID: userID
            })
        };
        try{
            await fetch('http://' + BACKEND_SERVER + '/amble/canvas/rate', settings);
        }catch (error){
            console.log(error);
        }
        console.log('success');

    }

    editCanvas(canvasID){
        this.props.navigation.navigate('EditCanvas', {canvasID: canvasID});
    }

    addCanvas(){
        this.props.navigation.navigate('AddCanvas');
    }






    async getData()
    {
        if(this.state.placeID!==this.state.prevdata)
        {
            try{
                //console.log(this.state.placeID)
                const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ this.state.placeID }&fields=name,rating,formatted_phone_number,photos&key=${GOOGLE_PLACES_API}`);
                const data_response = await data.json();
                this.setState({
                    details: data_response.result,
                    photo1:data_response.result.photos[0],
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

      let image1 = this.state.photo1.photo_reference

      const locationStyles = StyleSheet.create({
        canvasContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: 0,
            margin: 5,
            padding: 2
        },
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
          },touchbutton: {
            height: 40,
            borderBottomWidth: StyleSheet.hairlineWidth,
            justifyContent: 'center',
            backgroundColor:'skyblue',
            minWidth:Dimensions.get('window').width
          },
        textstyle:{
        textAlign: 'center',
        fontWeight:'bold'

        },
        imagestyle:{
        width:200, height: 123.6,borderRadius:20,borderWidth:1,alignSelf:'center',resizeMode:'cover'
        }
    });

    return (

        <View style={{flex: 1}}>

            <View style={{ flexDirection:'row', justifyContent: 'center', alignItems: 'center'}}>
                <Image style={{width:Dimensions.get('window').width*0.8, height: (Dimensions.get('window').height*0.2),borderRadius:20,alignSelf:'center',resizeMode:'cover'}}
                    source={this.state.photo1 ? {uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${ image1 }&key=${ GOOGLE_PLACES_API }`} : ''}
                    PlaceholderContent={<ActivityIndicator />}
                    />
             </View>
             <View style={{ flexDirection: 'column', flex: 1 }}>
             <Text style={locationStyles.textstyle}>Name: {this.state.details.name}</Text>
             <Text style={locationStyles.textstyle}>Contact Number : {this.state.details.formatted_phone_number}</Text>
             <Rating  type='star'  startingValue={this.state.rating} ratingCount={5}  imageSize={20}  showRating  onFinishRating={this.ratingCompleted}/>
             </View>

            {this.state.isProximity ?

                <View style= {locationStyles.canvasContainer}>
                    <View style={{flexDirection:'row'}}>
                    {this.state.canvases.map((canvas) => {

                            let image = 'data:image/png;base64,' + canvas.image
                            return(<Card
                            title={ canvas.title ? canvas.title : 'No Title' }
                            image={{ uri: `${image}`}}
                            imageProps={{ resizeMode: 'cover' }}
                            imageStyle={{width: 150, height: 150}}
                            >
                            <Text style={{ marginBottom: 10 }}>
                            { canvas.title ? canvas.title : 'No Description' }
                            </Text>
                            <Text style={{ marginBottom: 10 }}>Rating:
                            { canvas.rating }
                            </Text>
                            <Button
                            icon ={
                                <Icon name="thumbs-o-up" />
                            }
                            color='red'
                            title="Rate"
                            onPress={()=> this.rateCanvas(canvas.id, canvas.userID)}
                            />
                            <Button
                            icon ={
                                <Icon name="pencil" />
                            }
                            color='blue'
                            title="Edit"
                            onPress={() => this.editCanvas(canvas.id)}
                            />
                        </Card>)
                    })}
                    </View>

                    <Button
                        raised={true}
                        title="Add Canvas"
                        onPress={() => this.addCanvas()}
                    />

                 </View>
            : <View style={{flexDirection:'column', flex: 3}}><Text style={{textAlign: 'center', fontSize: 20}}>You are not near the landmark</Text></View>}



        </View>
    );
  }
}
export default LocationInformation;
