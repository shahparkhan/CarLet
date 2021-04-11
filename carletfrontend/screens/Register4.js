import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Register4({ navigation }) {

    const onPressHandler = async () => {
        try {
          await AsyncStorage.setItem('@isregistered', '1')
          await AsyncStorage.setItem('@isverified', '0')

        } catch (e) {
        }

        navigation.navigate('Register6')
    }

    return (
        <View style={RegisterStyles.container}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/register4.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                Register
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                We have received your registration information. We will get back to you shortly!
            </Text>
            <TouchableButton
                title="HOME"
                onPress={onPressHandler}
                buttonposition={styles.buttonposition}>
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