import React, {Component} from 'react';
import {GOOGLE_PLACES_API, BACKEND_SERVER} from 'react-native-dotenv';
import {View, Text, StyleSheet,FlatList,ActivityIndicator,Image,Dimensions} from 'react-native';
import {Rating} from 'react-native-elements'
class Leaderboard extends Component {
  constructor(props){
    super(props);
    this.state={
     leaderboarddata:[],
     pull:0
    }
  }
  
  ratingCompleted(rating) {
    console.log("Rating is: " + rating)
  }
  async getData()
  {    
    if(this.state.pull==0)
    {
      try{      

        const leaderboard = await fetch('http://' + BACKEND_SERVER + '/amble/canvas/top');
        const leaderboard_response = await leaderboard.json();
        console.log(leaderboard_response)
        
        this.setState({
          leaderboarddata:leaderboard_response,
          pull:1
        })
      }
      catch(error){
        this.setState({
          pull:0
        })
          console.log(error)
      
        }   
      } 
  }
  
  render() {
    this.getData();
    return (
      <View style={styles.container}>
        <Text style={styles.text}>LeaderBoard: Top 5</Text>
       <FlatList style={{flex:1, minWidth:(Dimensions.get('window').width)}} data={this.state.leaderboarddata}
       keyExtractor={(x,i)=> i}
       renderItem={({item})=>
       <View style={{flexDirection:'row'}}>
       <Image style={styles.imagestyle}  
        source={{uri: `data:image/gif;base64,${item.image}`}}
        PlaceholderContent={<ActivityIndicator />}
        />        
        <Text style={{fontStyle:'italic',fontWeight:'bold'}}>User : {item.userID}</Text>
        <Text style={{fontStyle:'italic',fontWeight:'bold'}}>Likes  : {item.rating}</Text>
        {/* <Rating  type='star'  startingValue={item.rating} ratingCount={5}  imageSize={20}  showRating  onFinishRating={this.ratingCompleted}/>                          */}
       </View>}
       />
         {/* <Text style={styles.text}>Leaderboard Screen</Text> */}
      </View>
    );
  }
}

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    minWidth:Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D3EDFF',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },imagestyle:{
    width:200, height: 123.6,borderRadius:20,borderWidth:1,alignSelf:'center',resizeMode:'cover'
  }
});