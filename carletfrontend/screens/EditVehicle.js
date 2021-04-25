import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditVehicle = ({ navigation }) => {
  const nameHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Vehicle Name",
      subheading: "Enter new vehicle name",
      placeholder: "Vehicle Name",
      vehicle_id: navigation.getParam('vehicle_id'),
      successBody: 'Your vehicle name has been updated successfully!',
      errorBody: ' There was some problem while updating your vehicle name. Please try again later.'
    });
  };
  const modelHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Vehicle Model",
      subheading: "Enter new vehicle model",
      placeholder: "Vehicle Model",
      vehicle_id: navigation.getParam('vehicle_id'),
      successBody: 'Your vehicle model has been updated successfully!',
      errorBody: ' There was some problem while updating your vehicle model. Please try again later.'
    });
  };
  
  const rateHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Rental Rate",
      subheading: "Enter new per day rate",
      placeholder: "Rental Rate",
      vehicle_id: navigation.getParam('vehicle_id'),
      successBody: 'Your vehicle rate has been updated successfully!',
      errorBody: ' There was some problem while updating your vehicle rate. Please try again later.'
    });
  };
  const docsHandler = () => {
    navigation.navigate("EditVehicleDocs", {
    title:"Vehicle Documents", 
    vehicle_id: navigation.getParam('vehicle_id'),
    successBody: 'Your vehicle docs has been updated successfully! Admin will verify your documents again.',
    errorBody: ' There was some problem while updating your vehicle docs. Please try again later.'
  });
  };
  const picHandler = async () => {
    let mytoken
    try{
      mytoken = await AsyncStorage.getItem('@mytoken')
    } catch (e) {
      console.log('error: ', e)
    }
    const vehicle_id = navigation.getParam('vehicle_id')
    

    try {
        response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/vehiclepictures/${vehicle_id}/`,{
        method: 'get',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        })

        responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson['Success'] != undefined){
          const picarr = responseJson['Success'].map((item)=>{return {uri:item}})
          
          navigation.navigate("EditVehiclePics", {
            result: picarr,
            vehicle_id: navigation.getParam('vehicle_id'),
            image_count: responseJson.count,
            title: "Vehicle Pictures",
            successBody: 'Your vehicle pictures have been updated successfully!',
            errorBody: ' There was some problem while updating your vehicle pictures. Please try again later.'
          });
          
        }
        
    } catch (error) {
        console.log("server error: ", error)
    }
    
  };

  return (
    <View style={styles.mainview}>
      <Text style={styles.heading}>{navigation.getParam("title")}</Text>

      <View style={styles.optionbox}>
        <TouchableOpacity onPress={() => nameHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Vehicle Name</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => modelHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Model</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => rateHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Rental Rate</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => picHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Pictures</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => docsHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Documents</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    alignItems: "center",
  },
  heading: {
    position: "relative",
    marginTop: 36,
    width: 360,
    alignSelf: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 15,
  },
  touch: {
    width: "100%",
    marginBottom: 15,
  },
  optionbox: {
    alignItems: "center",
    width: "70%",
  },
  card: {
    // borderColor: "lightgrey",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderRadius: 3,
  },
});

export default EditVehicle;
