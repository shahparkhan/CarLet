import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Register6({navigation}) {

    const logoutHandler = async () => {
        try {
          await AsyncStorage.setItem('@isloggedin', '0')

        } catch (e) {
            console.log("loggedout error: ", e)
        }
        navigation.navigate("Welcome")
    }

    return (
        <View style={RegisterStyles.container}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/register6.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Getting Approved
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                We are checking your documents.
            </Text>
            <TouchableButton
                title="LOGOUT"
                onPress={logoutHandler}
                buttonposition={RegisterStyles.buttonposition}>
            </TouchableButton>
            <Image
                style={RegisterStyles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
        </View>
    );
}