import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function Register({ navigation }) {

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
            <TouchableButton
                title="REGISTER"
                onPress={() => navigation.navigate("Register1")}
                buttonposition={RegisterStyles.buttonposition}>
            </TouchableButton>

        </View>
    );
}
