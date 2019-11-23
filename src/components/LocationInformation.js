import React, {Component} from 'react';
import {View, Text, StyleSheet,Image,ActivityIndicator,TouchableOpacity,Dimensions,ScrollView} from 'react-native';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import {Rating} from 'react-native-elements'

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
          canvas:[] ,
          firstcanvas:[],
          secondcanvas:[],
          checker:0
        }
      }
      componentDidMount(){        
        const placeID = this.props.navigation.getParam('placeID');
        this.setState({
            placeID: placeID
        })
        
      }
      _onPressButton() {
        alert('You tapped the button!')
      }
      ratingCompleted(rating) {
        console.log("Rating is: " + rating)
      }
        async getData()
        {
            if(this.state.placeID!==this.state.prevdata)
            {
                try{
                    //console.log(this.state.placeID)
                    const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ this.state.placeID }&fields=name,rating,formatted_phone_number,photos&key=${GOOGLE_PLACES_API}`);
                    const data_response = await data.json();
                    //const data = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/'+this.state,placeID+'/canvases');            
                    const data1 = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/1/canvases');
                    const data_response1 = await data1.json();
                    console.log("DATA : "+ data_response.result.name)
                    this.setState({            
                        details: data_response.result,
                        photo1:data_response.result.photos[0],
                        placeID:this.state.placeID,
                        prevdata:this.state.placeID, 
                        canvas: data_response1.canvases,
                        firstcanvas:data_response1.canvases[0],
                        secondcanvas:data_response1.canvases[1],
                    })
                    } catch(error) {
                        console.log(error)
                    }
            }
            
        }
        // async getListofCanvas()
        // {
        //   if(this.state.cherk==1)
        //   {
        //     try{
        //       console.log("fetching list")
        //       //const data = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/'+this.state,placeID+'/canvases');
        //       const data = await fetch('http://' + BACKEND_SERVER + '/amble/landmark/1/canvases');
        //       const data_response = await data.json();
        //       this.setState({            
        //           canvas: data_response.canvases,
        //           firstcanvas:data_response.canvases[0],
        //           secondcanvas:data_response.canvases[1],
        //           checker:0
        //       })
        //       } catch(error) {
        //           console.log(error)
        //       }
        //   }
        // }
  render() {
      this.getData();
      // this.getListofCanvas();
      console.log(this.state.firstcanvas.userID)      
    return ( 
         <View style={{flexDirection:'column',alignSelf:'center',backgroundColor:'white',minWidth:Dimensions.get('window').width,alignItems:'center'}}>  
             <View style={{ flexDirection:'row'}}>
              <Image style={{width:Dimensions.get('window').width*0.8, height: (Dimensions.get('window').height*0.2),borderRadius:20,alignSelf:'center',resizeMode:'cover'}}  
                source={this.state.photo1?{uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${Dimensions.get('window').width}&photoreference=${this.state.photo1.photo_reference}&key=${GOOGLE_PLACES_API}`}:''}
                PlaceholderContent={<ActivityIndicator />}
                />      
             </View>
             <Text style={styles.textstyle}>Name: {this.state.details.name}</Text>     
             <Text style={styles.textstyle}>Contact Number : {this.state.details.formatted_phone_number}</Text> 
           
                  <View style={{flexDirection:'row'}}>
                  <Image style={styles.imagestyle}  
                      source={this.state.firstcanvas?{uri: `data:image/gif;base64,${this.state.firstcanvas.image}`}:''}
                      PlaceholderContent={<ActivityIndicator />}
                      />  
                        <View style={{flexDirection:'column'}}>
                          <Text style={styles.textstyle}> Rating : </Text>  
                          <Rating  type='star'  startingValue={this.state.firstcanvas.rating} ratingCount={5}  imageSize={20}  showRating  onFinishRating={this.ratingCompleted}/> 
                          <Text style={styles.textstyle}> Description : {this.state.firstcanvas!==[]?this.state.firstcanvas.description:''}</Text> 
                          <Text style={styles.textstyle}> Author : {this.state.firstcanvas!==[]?this.state.firstcanvas.userID:''}</Text>  
                          </View>
                      </View>
                          <View style={{flexDirection:'row'}}>
                          <Image style={styles.imagestyle}  
                          source={this.state.secondcanvas?{uri: `data:image/gif;base64,${this.state.secondcanvas.image}`}:''}
                          PlaceholderContent={<ActivityIndicator />}
                          /> 
                              <View style={{flexDirection:'column'}}>
                          <Text style={styles.textstyle}> Rating : </Text>                            
                          <Rating  type='star'  startingValue={this.state.secondcanvas.rating} ratingCount={5} imageSize={20}  showRating  onFinishRating={this.ratingCompleted}/>                
                          <Text style={styles.textstyle}> Description : {this.state.secondcanvas!==[]?this.state.secondcanvas.description:''}</Text> 
                          <Text style={styles.textstyle}> Author : {this.state.secondcanvas!==[]?this.state.secondcanvas.userID:''}</Text> 
                          </View>   
                          </View>    
              <TouchableOpacity style={styles.touchbutton} onPress={this._onPressButton}>
              <Text style={{textAlign:'center'}}> Add canvas</Text>
            </TouchableOpacity>
            
        </View>    
    );
  }
}
export default LocationInformation;
const styles = StyleSheet.create({
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
    fontWeight:'bold'
    
  },
  imagestyle:{
    width:200, height: 123.6,borderRadius:20,borderWidth:1,alignSelf:'center',resizeMode:'cover'
  }
})