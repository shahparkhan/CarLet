import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function RentRequests({navigation}) {

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
                source={require('./../assets/rentrequestsvector.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Rent Request
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                Explore the rent requests you have sent and received
            </Text>
            <View style={styles.buttonposition}>
                <TouchableButton
                    title="SENT"
                    onPress={onSentHandler}>
                </TouchableButton>
                <TouchableButton
                    title="RECEIVED"
                    onPress={onReceivedHandler}
                    buttonposition={{marginLeft: 16}}>
                </TouchableButton>
            </View>
            
            
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