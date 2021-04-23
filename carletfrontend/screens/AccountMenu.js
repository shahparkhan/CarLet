import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Card from "../assets/components/YourVehicleCard";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import { Entypo,MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableHighlight } from "react-native";

const AccountMenu = ({navigation}) =>{

    const credentialHandler = () => {
        navigation.navigate('EditProfile')
    }
    const passwordHandler = () => {
        navigation.navigate('ChangePassword')
    }
    
    return(
    <View>

        <TouchableOpacity onPress = {()=>passwordHandler()}>
        <Text style= {styles.heading}>
        {navigation.getParam('name')}
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>credentialHandler} style = {styles.options}>

            <View style = {{flex:1}}>
            <Text style = {styles.text}>
                Change Credentials
            </Text>

            </View>
        </TouchableOpacity>

        <TouchableOpacity onPress = {()=>passwordHandler} style = {styles.options}>
            <Text style = {styles.text}>
                Change Password
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

export default AccountMenu;