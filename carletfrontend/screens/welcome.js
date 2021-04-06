import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
export default function Welcome({ navigation }) {
    
    
    const pressHandler = (to) => {
        navigation.navigate(to)
    }
    
    return (
        <View style={styles.container}>
            <Image 
                style = {styles.yellowvector}
                source={require('./../assets/YellowVector.png')}
            />
            <Text style = {styles.welcometext}>
                Welcome Screens!!!!
            </Text>
            <Text style = {styles.bodytext}>
                Our tagline which we haven't thought of yet
            </Text>
            <TouchableButton
                buttonposition={styles.buttonposition}
                title="LOGIN"
                onPress={() => pressHandler("Login")}
            ></TouchableButton>
            <TouchableButton
                buttonposition={styles.buttonposition}
                title="SIGNUP"
                onPress={() => pressHandler("SignUp0")}
            ></TouchableButton>
        </View>
    );
}

const win = Dimensions.get('window')

console.log(`height`,win.height)
console.log(`width`,win.width)

const height = (win.width/350)*320

const styles = StyleSheet.create({
    
    yellowvector: {
        width: win.width,
        height: height
    },

    container: {
        flex: 1
    },

    welcometext: {
        position: 'relative',
        top: -50,
        alignSelf: 'center',
        fontFamily: 'Nunito-ExtraBold',
        fontSize: 36,
        textAlign: 'center'
    },

    bodytext: {
        width: 300,
        position: 'relative',
        top: -40,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    },

    buttonposition: {
        position: "relative",
        marginTop: 16,
        alignSelf: "center"
    },

})
