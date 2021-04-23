import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function EditProfile( {navigation} ) {

    const [name,setName] = useState(``)
    const [number,setNumber] = useState(``)
    
    const [errorMsg,seterrorMsg] = useState(``);
    const [error,seterror] = useState(false);

    
    const NameHandler = (name) => {
        setName(name)
    }

    const NumberHandler = (number) =>{
        setNumber(number)
    }

    
    const validateInput = async () =>
    {
        if (Nic === ``)
        {

        } 
        else {
            let phonedigits = phonenumber.split("")
            const phonewithcode = "+92" + phonedigits.slice(1,phonedigits.length).join("")


            console.log("ALl GOOD!");
      
            const details = {
                name: name,
                phone_number: phonedigits,

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
            <Text style = {styles.heading}>
                Edit Profile
            </Text>
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.error}></Text>}
            
            <Text style = {styles.subheading}>
                Enter new name
            </Text>
            <TextField
                placeholder={"Name"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                }}
                changeHandler={NameHandler}
                secureTextEntry={false}
            />
            <Text style = {{...styles.subheading,marginTop:12}}>
                Enter new phone number
            </Text>
            <TextField
                placeholder={"Phone number"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                }}
                changeHandler={NumberHandler}
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

    registertext: {
        position: 'relative',
        marginTop: 12,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    subheading:{
        alignSelf:'center',
        position:'relative',
        marginTop:-10,
        fontFamily:"Nunito-SemiBold",
        fontSize: 18,
    },
    key:{
        fontFamily:"Nunito-SemiBold",
        fontSize:16,
        position:'relative',
        marginTop: 20,
        left:16

    },

    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: win.height - 36,
        right: 16,
    },
    uploadposition : {
        position: "relative",
        marginTop: -35,
        right:-84,
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
