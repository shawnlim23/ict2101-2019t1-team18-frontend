import React, {Component} from 'react';
import {StyleSheet,Text,TextInput,View,ScrollView,ActivityIndicator,Button} from 'react-native';


export default class Landmark extends React.Component
{
    constructor(props){
        super(props);        
        this.state = {
            landmark: {},
            placeID:''
        }
    } 

    async getData(placeID){

        if (!this.state.placeID || this.state.placeID!==placeID)
        {
            try{
                const data = await fetch(`http://112.199.145.252:5000/amble/landmark/${ placeID }`);
                const data_response = await data.json();
                //console.log(data_response)
                this.setState({
                    landmark: data_response,
                    placeID:placeID
                })
            } catch(error) {
                console.log(error)
            }
        }
        

    }

    render() {

        this.getData(1);
        console.log(this.state.landmark);        
        return (                    
            <View>
                <Text> Name: {this.state.landmark.name} </Text>
                <Text> Description:{this.state.landmark.description} </Text>
                <Text> Place Id:{this.state.landmark.placeID} </Text>
            </View>

        );
    }
  }