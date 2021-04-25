import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";

export default function CautionPrompt({navigation}) {

    const onYesHandler = async () => {
        
        let responseJson
        let mytoken = navigation.getParam('token')
        try {
            let response = await fetch(navigation.getParam('apiLink'),{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${mytoken}`
            },
            body: navigation.getParam('apiBody')
            })
            responseJson = await response.json()
            console.log('server response: ', responseJson)
            if (responseJson['Success'] != undefined) {
                navigation.navigate('SuccessPrompt', {title: navigation.getParam('title'), body: navigation.getParam('successBody')})
            } else {
                navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})
            }
            
            
        } catch (error) {
            console.error('server error: ', error);
            navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})

            
        }

    }
    const onNoHandler = () => {
        
        navigation.goBack()
    }

    return (
        <View style={{...RegisterStyles.container, position:"relative", top:-50}}>
            <Image 
                style = {RegisterStyles.yellowvector}
                source={require('./../assets/cautionyellowvector.png')}
            />
            <Text style = {RegisterStyles.registertext}>
                {navigation.getParam('title')}
            </Text>
            <Text style = {RegisterStyles.bodytext}>
                Are you sure you want to proceed?
            </Text>
            <View style={styles.buttonposition}>
                <TouchableButton
                    title="YES"
                    onPress={onYesHandler}>
                </TouchableButton>
                <TouchableButton
                    title="NO"
                    onPress={onNoHandler}
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