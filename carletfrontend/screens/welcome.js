import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';

export default function Welcome() {
    return (
        <View style={styles.container}>
            <Image 
                style = {styles.yellowvector}
                source={require('./../assets/YellowVector.png')}
            />
            <Text style = {styles.welcometext}>
                Welcome Screen
            </Text>
            <Text style = {styles.bodytext}>
                Our tagline which we haven't thought of yet
            </Text>
        </View>
    );
}

const win = Dimensions.get('window')
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
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    bodytext: {
        width: 300,
        position: 'relative',
        top: -40,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    }
})
