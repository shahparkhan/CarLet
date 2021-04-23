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
    const [Nic,setNic] = useState(``)
    const [errorMsg, seterrorMsg] = useState(``);
    const [error, seterror] = useState(false);

    const NICHandler = (nic) => {
        setNic(nic)
    }

    const validateInput = async () =>
    {
        if (Nic === ``)
        {
            let field = "black"
            seterrorMsg(`Please input ${navigation.getParam('placeholder')}`);
            console.log("NIC fields is empty");
            field = "red"
            seterror(true);
            setborderColor(field);   
        } 
        else {

            console.log("ALl GOOD!");
      
            seterrorMsg("");
            seterror(false);
            setborderColor("black");

            const details = {
                nic: Nic,
                nicPicture: image,
            }
            const validationDetails = JSON.stringify({
                nic: Nic,
            })
            
            let mytoken = ''

            try {
                mytoken = await AsyncStorage.getItem('@mytoken')
            
            } catch (error) {
                console.error('Failed to get token: ', error)
            }


            try {
                let response = await fetch('https://carlet.pythonanywhere.com/uservalidation/',{
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${mytoken}`
                },
                body: validationDetails
                })
                let responseJson = await response.json()
                console.log('server response: ', responseJson)
                
                if (responseJson.nic === "This NIC number is already registered"){
                    seterrorMsg("This NIC number is already registered");
                    seterror(true);
                } else {
                    navigation.navigate("Register2", {params: details})
                }

            } catch (error) {
                console.error('server error: ', error);
                seterrorMsg("Server error. Please try again");
                seterror(true);
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
                changeHandler={NICHandler}
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
