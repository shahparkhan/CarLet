import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Register({ navigation }) {

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
                source={require('./../assets/register.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Register
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                Before using the application, you need to register your identification documents.
                After your documents are authenticated, you will be allowed to rent out cars!
            </Text>
            <Image
                style={RegisterStyles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
            <View style={{...RegisterStyles.buttonposition, flexDirection:"row", justifyContent:"space-between"}}>
                <TouchableButton
                    title="REGISTER"
                    onPress={() => navigation.navigate("Register1")}
                    >
                </TouchableButton>
                <TouchableButton
                    title="LOGOUT"
                    onPress={logoutHandler}
                    buttonposition={{position:"relative", marginLeft:16}}>
                </TouchableButton>
            </View>
            

        </View>
    );
}

