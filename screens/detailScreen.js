import React from 'react';
import { Button,StyleSheet, View, Text,TouchableOpacity ,SectionList,Alert,Platform } from 'react-native';
const DATA = [
  {
    title: 'Start location',
    data: [
      {address:'Bishan',
      description: 'S582834'},
    ]
  },
  {
    title: 'Opp Serangoon Stn',
    data: [
      {address:'Bus 50',
      description: '10 mins'},
    ]
  },
  {
    title: 'Reach Destination',
    data: [
      {address:'Ang Mo Kio Stn',
      description: 'S623823'},
    ]
  },
];
class SectionListItem extends React.Component{
  render(){
    return (
      <View style={{
        flex:1,
        flexDirection:'column',
        backgroundColor:'rgb(98,197,184)'
      }}>
        <Text style={{fontSize:16,marginLeft:20,marginRight:10}}>{this.props.item.address}
        </Text>
        <Text style={{fontSize:16,marginLeft:20,marginRight:10}}>{this.props.item.description}
        </Text>
      </View>
    )
  }
}

class SectionHeader extends React.Component{
  render(){
    return(
      <View style={{flex:1,backgroundColor:'rgb(77,120,140}',
      }}>
        <Text style={{fontSize:16,fontWeight:'bold',color:'black',margin:20}}>
          {this.props.section.title}
          </Text>
          <View style={{backgroundColor:'rgb(77,120,140)',height:1,margin:4,marginLeft:20,marginRight:10}}></View>
      </View>
      )
  }
}
class DetailsScreen extends React.Component {
    render() {      
      return (        
        <View style={styles.containerCol}>
          <Text> Bus Journey Details </Text>
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
      justifyContent:'flex-end',
      marginBottom:8,
    } 
  })