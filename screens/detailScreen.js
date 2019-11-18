import React from 'react';
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
        {this.renderSwitch(this.props.item.type)}         
        <View style={{flexDirection:'column'}}>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.item.address}
          </Text>
          <Text style={{fontSize:12,marginLeft:20,marginRight:10}}>{this.props.item.description}
          </Text>
        </View>
      </View>
    )
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
          {this.props.section.title}
          </Text>
          <View style={{backgroundColor:'rgb(77,120,140)',height:2,margin:1,marginLeft:20,marginRight:10}}></View>
      </View>
      )
  }
}
class DetailsScreen extends React.Component {
    render() {      
      return (        
        <View style={styles.containerCol}>
          <Text style={styles.journeyheader}> Bus Journey Details </Text>
          <View >
           
              <SectionList
                renderItem={({item,index})=>{
                  return(
                  <SectionListItem item={item} index={index}>                    
                  </SectionListItem>)
                }} 
                renderSectionHeader={({section})=>{
                  return(<SectionHeader section={section}/>);
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