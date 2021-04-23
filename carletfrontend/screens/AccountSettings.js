import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function RentRequests({navigation}) {

    const onProfileHandler = () => {
        
        navigation.navigate('AccountMenu',{name:'Shahpar Nafees'})
    }
    const onVehicleHandler = () => {
        navigation.navigate('YourVehicles')
    }
    const onPasswordHandler = () => {
        console.log(`asd`)
    }
    return (
        <View style={{...RegisterStyles.container, position:"relative", top:-50}}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/accountsettingsvector.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Account Settings
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                Edit your account details
            </Text>
            <View style={styles.buttonposition}>
                <TouchableButton
                    title="PROFILE"
                    onPress={onProfileHandler}>
                </TouchableButton>
                <TouchableButton
                    title="VEHICLES"
                    onPress={onVehicleHandler}
                    buttonposition = {{marginLeft: 16}}
                >
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
})