import React from 'react';
import API_KEY from '../key';
import { Button,StyleSheet, View, Text,TouchableOpacity ,SectionList,Alert,Platform,Image } from 'react-native';
const DATA = [
  {
    title: 'Start location',
    data: [
      {address:'Bishan',
      description: 'S582834',
      type:'start'},
    ]
  },
  {
    title: 'Opp Serangoon Stn',
    data: [
      {address:'Bus 50',
      description: '10 mins',
      type:'transit'},
    ]
  },
  {
    title: 'Reach Destination',
    data: [
      {address:'Ang Mo Kio Stn',
      description: 'S623823',
      type:'stop'},
    ]
  },
];
class SectionListItem extends React.Component{
  render(){
    return (
      <View style={{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#ffbb33'
      }}>       
        {/* {this.renderSwitch(this.props.item.type)}          */}
        {this.renderPhoto(this.props.data.photos[0])}
        
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.data.rating}</Text>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.data.name}</Text>
 
          {/* <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.item.address}
          </Text>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.item.description}
          </Text> */} 
        </View>
      </View>
    )
  }
  renderPhoto(param)
  {
    console.log("Param" + param);
    <View><Image style={{width: 35, height: 35}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} /></View> 
  }
  renderSwitch(param)
  {
    switch (param){
      case 'start':
        return (<View><Image style={{width: 35, height: 35}} source={require('../images/startingpoint.jpg')} /></View> );
      case 'stop':
        return  (<View><Image style={{width: 35, height: 35}} source={require('../images/destination.jpg')} /></View> );
      default:
        return (<View><Image style={{width: 35, height: 35}} source={require('../images/transit.jpg')} /></View>);
    }
  }
 
}

class SectionHeader extends React.Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#fec0aa',
      }}>
        
        <Text style={{fontSize:16,fontWeight:'bold',color:'black',margin:5}}>
          {this.props.data.name}
          </Text>
          <View style={{backgroundColor:'rgb(77,120,140)',height:2,margin:1,marginLeft:20,marginRight:10}}></View>
      </View>
      )
  }
}
class DetailsScreen extends React.Component {
  constructor(props){
    super(props);
    this.state={
      details:{},
      placeID:''
    }
  }
  async getData(placeID)
  {
    if(!this.state.placeID||this.state.placeID!==placeID)
    {
      try{
        const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ placeID }&fields=name,rating,formatted_phone_number,photos&key=AIzaSyDUBQ_mog4t13RTKllJcaPGI9Nk1rzkbZQ`);
        const data_response = await data.json();
        //console.log(data_response.result)
        this.setState({            
            details: data_response.result,
            placeID:placeID
        })
      } catch(error) {
          console.log(error)
      }
    }
  }
  render() { 
      this.getData('ChIJN1t_tDeuEmsRUsoyG83frY4');
      //console.log(typeof(this.state.details));       
      console.log(this.state.details);        
      return (        
        <View style={styles.containerCol}>
          <Text style={styles.journeyheader}> Bus Journey Details </Text>
          <View >
           
              <SectionList
                renderItem={({item,index})=>{
                  return(
                  <SectionListItem item={item} index={index} data={this.state.details}>                    
                  </SectionListItem>)
                }} 
                renderSectionHeader={({section})=>{
                  return(<SectionHeader section={section}  data={this.state.details}/>);
                }}
                sections={DATA}
                keyExtractor={(item,index) => item.address}
                >
                  </SectionList>
             
          </View>
          <View style={styles.bottomRow}>
          <TouchableOpacity style={styles.tabs} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text>Close</Text>
          </TouchableOpacity>      
          </View>
               
        </View>
      );
    }
  
  }
  export default DetailsScreen;
  const styles = StyleSheet.create({
    tabs: {
      height: 50,
      borderBottomWidth: StyleSheet.hairlineWidth,
      justifyContent: 'center',
      alignItems:'center'
    },      
    containerRow:{
      flex:1,
      flexDirection:'row', 
    },
    containerCol:{
      flex:1,
      flexDirection:'column', 
    },     
    bottomRow:{
      flex:1,
      //justifyContent:'flex-end',
      marginBottom:8,
    } ,
    journeyheader:{
      fontSize:16,
      backgroundColor:'yellow',
      borderRadius:10,
      alignSelf:'flex-start'
    },
  })