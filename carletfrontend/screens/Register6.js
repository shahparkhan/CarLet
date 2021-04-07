import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function Register6() {

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
            <Image
                style={RegisterStyles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
        </View>
    );
}