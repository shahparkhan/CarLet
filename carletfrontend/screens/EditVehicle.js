import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Card from "../assets/components/YourVehicleCard";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import { Entypo,MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableHighlight } from "react-native";

const EditVehicle = ({navigation}) =>{

    const nameHandler =() => {
        navigation.navigate('EditVehicleGeneral', {title: 'Vehicle Name', subheading: 'Enter new vehicle name',placeholder:'Vehicle Name' })
    }
    const modelHandler =() => {
        navigation.navigate('EditVehicleGeneral', {title: 'Vehicle Model', subheading: 'Enter new vehicle model',placeholder:'Vehicle Model' })
    }
    const typeHandler =() => {
        navigation.navigate('EditVehicleGeneral', {title: 'Vehicle Type', subheading: 'Enter new vehicle type',placeholder:'Vehicle Type' })
    }
    const rateHandler =() => {
        navigation.navigate('EditVehicleGeneral', {title: 'Rental Rate', subheading: 'Enter new per day rate',placeholder:'Rental Rate' })
    }

    const docsHandler =() => {
        navigation.navigate('EditVehicleDocs')
    }

    return(
    <View>

        <TouchableOpacity onPress = {()=>docsHandler()}>
        <Text style= {styles.heading}>
        {navigation.getParam('title')}
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>nameHandler} style = {styles.options}>

            <View style = {{flex:1}}>
            <Text style = {styles.text}>
                Change Vehicle Name
            </Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>modelHandler} style = {styles.options}>
            <Text style = {styles.text}>
                Change Vehicle Model
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>typeHandler} style = {styles.options}>
            <Text style = {styles.text}>
                Change Vehicle Type
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>rateHandler} style = {styles.options}>
            <Text style = {styles.text}>
                Change Rental Rate
            </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>console.log(`q`)} style = {styles.options}>
            <Text style = {styles.text}>
                Change Vehicle Pictures
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>docsHandler} style = {styles.options}>
            <Text style = {styles.text}>
                Change Vehicle Documents
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

export default EditVehicle;