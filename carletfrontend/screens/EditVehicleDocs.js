import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import RegisterStyles from "./RegisterStyles";

const EditVehicleDocs = ({navigation}) =>{

    const registrationHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Vehicle Registration Docs', subheading: 'Upload new registration documents', vehicle_id: navigation.getParam('vehicle_id'), successBody: navigation.getParam('successBody'), errorBody: navigation.getParam('errorBody')})
    }
    const insuranceHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Vehicle Insurance Docs', subheading: 'Upload new vehicle documents', vehicle_id: navigation.getParam('vehicle_id'), successBody: navigation.getParam('successBody'), errorBody: navigation.getParam('errorBody')})
    }
    const trackerHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Vehicle Tracker Docs', subheading: 'Upload new tracker documents', vehicle_id: navigation.getParam('vehicle_id'), successBody: navigation.getParam('successBody'), errorBody: navigation.getParam('errorBody')})
    }


    return (
        <View style={styles.mainview}>
          <Text style={styles.heading}>{navigation.getParam("title")}</Text>
    
          <View style={styles.optionbox}>
            <TouchableOpacity onPress={() => registrationHandler()} style={styles.touch}>
              <View style={styles.card}>
                <Text style={styles.text}>Change Registration Document</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => insuranceHandler()} style={styles.touch}>
              <View style={styles.card}>
                <Text style={styles.text}>Change Insurance Document</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => trackerHandler()} style={styles.touch}>
              <View style={styles.card}>
                <Text style={styles.text}>Change Tracker Document</Text>
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

export default EditVehicleDocs;