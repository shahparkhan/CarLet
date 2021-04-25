import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditVehicleGeneral ( {navigation} ) {
    const [borderColor, setborderColor] = useState("black");
    const [item,setItem] = useState(``)
    const [errorMsg, seterrorMsg] = useState(``);
    const [error, seterror] = useState(false);

    const itemHandler = (item) => {
        setItem(item)
    }

    const validateInput = async () =>
    {
        if (item === ``)
        {
            let field = "black"
            seterrorMsg(`Please input ${navigation.getParam('placeholder')}`);
            console.log("item fields is empty");
            field = "red"
            seterror(true);
            setborderColor(field);   
        } 
        else {
            console.log('button clicked')
            let apiBody = {}
            if (navigation.getParam('title') === 'Vehicle Name'){
                apiBody.vehicle_name = item
            } else if (navigation.getParam('title') === 'Vehicle Model'){
                apiBody.vehicle_model = item
            } else if (navigation.getParam('title') === 'Rental Rate'){
                apiBody.rate = item
            }
      
            seterrorMsg("")
            seterror(false)
            setborderColor("black")

            let mytoken

            try{
                mytoken = await AsyncStorage.getItem("@mytoken")
            } catch (e) {
                console.log("error ", e)
            }
            console.log('api req')
            let vehicle_id =  navigation.getParam('vehicle_id')
            console.log("vehicleid ", vehicle_id)
            
            try {

                console.log(JSON.stringify(apiBody))
                response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/vehiclesetting/${vehicle_id}/`,{
                method: 'patch',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${mytoken}`
                },
                body: JSON.stringify(apiBody)
                })
                responseJson = await response.json()
                console.log('server response: ', responseJson)
                if (responseJson['Success'] != undefined){
                    navigation.navigate('SuccessPrompt', {title: navigation.getParam('title'), body: navigation.getParam('successBody')})
                } else {
                    navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})
                }
                
            } catch (error) {
            }
            
        }

    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
            <Text style= {styles.heading}>
                {navigation.getParam('title')}
            </Text>
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.error}></Text>}
            
            <Text style = {styles.subheading}>
                {navigation.getParam('subheading')}
            </Text>
            <TextField
                placeholder={navigation.getParam('placeholder')}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                    borderColor: borderColor,
                }}
                changeHandler={itemHandler}
                secureTextEntry={false}
            />

            <Image
                style={styles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
            </KeyboardAwareScrollView>
            <TouchableButton
                title="UPDATE"
                onPress={validateInput}
                buttonposition={styles.buttonposition}>
            </TouchableButton>
        </View>
    );
}

const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height-184;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    heading: {
        position: 'relative',
        marginTop: 36,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    subheading:{
        left:16,
        position:'relative',
        marginTop:16,
        fontFamily:"Nunito-Regular",
        fontSize: 24,
        width:win.width
    },

    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: win.height - 36,
        right: 16,
    },
    buttonposition: {
        alignSelf:'center',
        position: "absolute",
        top: buttonHeight
    },
    error: {
        color: "tomato",
        alignSelf: "center",
        position: "relative",
        marginTop: 16
    }
})
