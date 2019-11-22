import React from 'react';
import API_KEY from '../key';
import { Button,StyleSheet, View, Text,TouchableOpacity ,SectionList,Alert,Platform,Image ,FlatList,Dimensions} from 'react-native';

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
        {/* {this.renderPhoto(this.props.data.photos)} */}
        {/* console.log({this.props.data}) */}
        {/* console.log({this.props.data.result.photos.map(item => item.photo_reference)}) */}
        {/* {this.props.data.photos.map((item)=>{
          {console.log(item.photo_reference)}
          {item.map((photosubitems)=>
            {console.log(photosubitems.photo_reference)
            console.log(photosubitems.width)}
          )}
            {item.name}
                {item.photos.map((photosubitems)=>
                    {photosubitems.photo_reference
                    this.renderPhoto(photosubitems.photo_reference)
                    }
                )}          
        })} */}
        {/* <View style={{flexDirection:'row'}}>
          
        </View>
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.data.rating}</Text>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.data.name}</Text>
 
        </View> */}
      </View>
    )
  }
  renderPhoto(param)
  {
    //console.log("Param" + param);
    <View><Image style={{width: 35, height: 35}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} /></View> 
  } 
}

class SectionHeader extends React.Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:'#fec0aa',
      }}>
        
        <Text style={{fontSize:16,fontWeight:'bold',color:'black',margin:5}}>
          {this.props.section}
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
      details:[],
      maindata:[],
      placeID:''
    }
  }
  async getData(placeID)
  {
    if(!this.state.placeID||this.state.placeID!==placeID)
    {
      try{
        //console.log('ASFDASDF')
        const data = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${ placeID }&fields=name,rating,formatted_phone_number,photos&key=AIzaSyDUBQ_mog4t13RTKllJcaPGI9Nk1rzkbZQ`);
        //const data= await fetch("https://randomuser.me/api?results=10");
        const data_response = await data.json();
        console.log(data_response.result.photos)
        this.setState({            
            details: data_response.result.photos,
            maindata:data_response.result,
            placeID:placeID
        })
      } catch(error) {
          console.log(error)
      }
    }
  }
  componentWillMount(){
    this.getData('ChIJN1t_tDeuEmsRUsoyG83frY4');
 }
 
  render() { 
      //let photo = this.state.details.result.photos.map(item => item.photo_reference)
      //console.log(photo)
      return (     
        <View style={styles.containerCol}>
          <Text style={styles.journeyheader}> Bus Journey Details </Text>
          <Text> Name: {this.state.maindata.name}</Text>
          <TouchableOpacity style={styles.tabs} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text>Close</Text>
              </TouchableOpacity> 
          <View style={{flex:1}} >       
            <FlatList
              data={this.state.details}
              keyExtractor={(x,i)=>i}
              renderItem={({item})=>
              <View>  
                {/* <Text>{`${item.photo_reference}`}</Text> */}
                <Image style={{width:100, height: 100}}  
                source={{uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=50'+
                '&maxheight=50&photoreference='+item.photo_reference+'&key=AIzaSyDUBQ_mog4t13RTKllJcaPGI9Nk1rzkbZQ'}}
                />
                <Text>Author:{this.rendername(item.html_attributions)}</Text>
              </View>

              }
            />
            </View>
            <TouchableOpacity style={styles.tabs} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text>Close</Text>
            </TouchableOpacity> 
           
             {/* <Image style={{width: item, height: item.height}}  source={{uri: item.photo_reference}} />   
              {/* <SectionList
                renderItem={({item,index,section})=>{
                  return(
                  <SectionListItem item={item} index={index} >                    
                  </SectionListItem>)
                }} 
                renderSectionHeader={({section})=>{
                  return(<SectionHeader section={section}/>);
                }}
                sections={this.state.details}
                keyExtractor={(item,index) => item.result}
                ></SectionList> */}
             
          
               
        </View>
      );
    }
    rendername(param)
    {
      const regex = /(<([^>]+)>)/ig;      
      var t = param[0];
      const result = t.replace(regex, '');
     return result;
    }
  }
  export default DetailsScreen;
  const styles = StyleSheet.create({
    tabs: {
      height: 30,
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
    list: {
      justifyContent: 'center',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  })