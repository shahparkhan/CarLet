import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function RequestSent({navigation}) {

    const onPressHandler = () => {
        
        navigation.navigate('Home')
    }

    return (
        <View style={{...RegisterStyles.container, position:"relative", top:-50}}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/booknowwait.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Request Sent
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                Now you will have to wait for owners approval
            </Text>
            <TouchableButton
                title="HOME"
                onPress={onPressHandler}
                buttonposition={RegisterStyles.buttonposition}>
            </TouchableButton>
            <Image
                style={RegisterStyles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
        </View>
    );
}

const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height-184;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
    buttonposition: {
        alignSelf:'center',
        position: "absolute",
        top: buttonHeight
    },
})