import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function SuccessPrompt({navigation}) {

    const onSentHandler = () => {
        
        navigation.navigate('SentRequests')
    }
    const onReceivedHandler = () => {
        
        navigation.navigate('Home')
    }

    return (
        <View style={{...RegisterStyles.container, position:"relative", top:-50}}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/successyellowvector.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                {navigation.getParam('title')}
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                {navigation.getParam('body')}
            </Text>
            
            
        </View>
    );
}

const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height-104;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
    buttonposition: {
        alignSelf:'center',
        position: "absolute",
        top: buttonHeight,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    heading: {

    }
})