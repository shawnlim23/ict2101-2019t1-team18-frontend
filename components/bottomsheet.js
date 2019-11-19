import { default as React } from 'react';
import { Dimensions, StyleSheet, View , Text, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";



class RBS extends React.Component{


  constructor(props) {
    super(props);
    }

    componentDidMount(){
        this.props.setRef(this);
    }


  render() {
    const styles = StyleSheet.create({
        button: {
            width: 150,
            backgroundColor: "#4EB151",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 3,
            margin: 10,
            flexDirection: "row",
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
        <View style = {
           {
            justifyContent: "center",
            alignItems: "center",
            flex: 1
            }
        }>
            <Text>{this.props.name}</Text>
            {this.props.isProximity ? (<TouchableOpacity style={styles.button} ></TouchableOpacity>) : null}
            {this.props.started_route ? (<TouchableOpacity style={styles.button} onPress={() => this.props.updateRoute(this.props.location, this.props.placeID)}><Text>Add to Route</Text></TouchableOpacity>) : null}
            <TouchableOpacity style={styles.button}><Text>View More Information</Text></TouchableOpacity>
        </View>
    </RBSheet>
    );
  }
}



export default RBS;