import { default as React } from 'react';
import { Dimensions, StyleSheet, View , Text, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from "react-native-vector-icons/FontAwesome";


class RBS extends React.Component{


  constructor(props) {
    super(props);
    }

    componentDidMount(){
        this.props.setRef(this);
    }


  render() {
    const styles = StyleSheet.create({
        addbutton: {
            width: 100,
            backgroundColor: "#4EB151",
            // paddingVertical: 10,
            // alignItems: "center",
            borderRadius: 3,
            margin: 10,
            padding: 10
        },
        moreinfobutton: {
          width: 100,
          // height: '30%',
          backgroundColor: "#0d47a1",
          // paddingVertical: 10,
          // alignItems: "center",
          borderRadius: 3,
          margin: 10,
          padding: 10
      },
        text: {
          fontSize: 15,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'white'
        },
        buttonStyleContainer: {
          flex: 1,
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'center',
          alignItems: 'center'
        }
    })
    // this.props.setRef = this.RBSheet;


    return (
    <RBSheet
        ref={this.props.setRef}
        height={200}
        closeOnDragDown={true}
        // customStyles={{
        //     container: {
        //     justifyContent: "center",
        //     alignItems: "center",
        //     flex: 1
        //     // padding: 25
        //     }
        // }}
        >
        <Text style={{textAlign: 'center', fontSize: 20}}>{this.props.name}</Text>
        <View style={styles.buttonStyleContainer}>

            {/* {this.props.isProximity ? (<TouchableOpacity style={styles.button} ></TouchableOpacity>) : null} */}
            <TouchableOpacity style={styles.addbutton} onPress={() => this.props.updateRoute(this.props.location, this.props.placeID)}><Icon name="plus-circle" size={15} color="white"><Text style={styles.text}> Add to Route</Text></Icon></TouchableOpacity>
            <TouchableOpacity style={styles.moreinfobutton} onPress={() => this.props.getLocationInformation(this.props.placeID, this.props.isProximity, this.props.rating)}><Icon name="info-circle" size={15} color="white"><Text style={styles.text}> View More Information</Text></Icon></TouchableOpacity>
        </View>
    </RBSheet>
    );
  }
}



export default RBS;