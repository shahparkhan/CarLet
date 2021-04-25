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

    
    const validateInput = async () => {
        let mytoken
        let myuuid

        try{
            mytoken = await AsyncStorage.getItem("@mytoken")
            myuuid = await AsyncStorage.getItem("@useruuid")
        } catch (e) {
            console.log("error ", e)
        }
        console.log("uuid ", myuuid)
        console.log("token ", mytoken)
        
        let apiBody = {}
        if (name === "" && number === ""){
            seterror(true)
            seterrorMsg("Please fill a field before pressing update button.")
        } else if (number[0] != "+" || number[1] != "9" || number[2] != "2") {
            seterror(true)
            seterrorMsg("Please fill the phone number field with +92 country code")
        } else if (number.length != 13) {
            seterror(true)
            seterrorMsg("Incorrect length of phone number")
        } else {

            seterror(false)
            seterrorMsg("")

            if (name != "" && number != ""){
                apiBody.name = name
                apiBody.phone_number = number.replace("0", "+92")
            } else if (name != ""){
                apiBody.name = name
            } else if (number != ""){
                apiBody.phone_number = number.replace("0", "+92")
            }
            console.log("number: ", apiBody)

            try {

                
                response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/accountsetting/${myuuid}/`,{
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
                navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})
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
                placeholder={"Example: +923331234123"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                }}
                changeHandler={NumberHandler}
                secureTextEntry={false}
                keyboardType={"phone-pad"}
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
        marginTop: 16,
        marginBottom: 16
    }
})
