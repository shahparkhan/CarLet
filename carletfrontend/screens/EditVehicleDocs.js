import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import RegisterStyles from "./RegisterStyles";

const EditVehicleDocs = ({navigation}) =>{

    const registrationHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Registration', subheading: 'Upload new registration documents'})
    }
    const insuranceHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Insurance', subheading: 'Upload new vehicle documents'})
    }
    const trackerHandler =() => {
        navigation.navigate('VehicleDocsGeneral', {title: 'Tracker', subheading: 'Upload new tracker documents'})
    }


    return(
    <View>

        <TouchableOpacity onPress = {()=>registrationHandler()}>
        <Text style= {styles.heading}>
            Vehicle Documents
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>registrationHandler()} style = {styles.options}>

            <View style = {{flex:1}}>
            <Text style = {styles.text}>
                Change Registration Documents
            </Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>insuranceHandler()} style = {styles.options}>
            <Text style = {styles.text}>
                Change Insurance Documents
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>trackerHandler()} style = {styles.options}>
            <Text style = {styles.text}>
                Change Tracker Documents
            </Text>
        </TouchableOpacity>

        <View style = {styles.options}>
        </View>

    </View>
    );
}

const styles = StyleSheet.create({

    heading: {
        position: 'relative',
        marginTop: 36,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    text:{
        marginTop:12,
        alignSelf:'center',
        fontFamily:"Nunito-Regular",
        fontSize:14,
    },
    options:{
        flex:1,
        marginTop:47,
        borderTopColor: "#D8D8D8",
        borderTopWidth: 1,
    },
})

export default EditVehicleDocs;