import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ChangePassword( {navigation} ) {

    const [password,setPassword] = useState(``)
    const [confirmPassword,setconfirmPassword] = useState(``)
    const [errorMsg,seterrorMsg] = useState(``);
    const [error,seterror] = useState(false);
    const [borderColor, setborderColor] = useState(["black", "black"]);

    
    const PasswordHandler = (password) => {
        setPassword(password)
    }

    const ConfirmPasswordHandler = (confirmPassword) =>{
        setconfirmPassword(confirmPassword)
    }

    
    const validateInput = async () =>
    {
        if (password === `` || confirmPassword == ``) {
            seterror(true);
            seterrorMsg(`Some fields are empty`);
            
            let field1 = "black"
            let field2 = "black"
            
            if (password === ""){
                field1 = "red"
            } 
            if (confirmPassword === "") {
                field2 = "red"
            } 
            setborderColor([field1, field2])
        } else if (password != confirmPassword) {
            seterror(true);
            setborderColor(["red","red"]);
            seterrorMsg(`Passwords don't match`);
        } else if (password.length < 8) {

            seterror(true);
            seterrorMsg("Password should be eight characters long");
            setborderColor(["red", "red"]);
      
        } else {
            seterrorMsg("");
            seterror(false);
            setborderColor(["black", "black"]);

            let mytoken
            let myuuid

            try{
                mytoken = await AsyncStorage.getItem("@mytoken")
                myuuid = await AsyncStorage.getItem("@useruuid")
            } catch (e) {
                console.log("error ", e)
            }

            try {

                const apiBody = JSON.stringify({
                    password: password
                })
      
                response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/accountsetting/${myuuid}/`,{
                method: 'patch',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${mytoken}`
                },
                body: apiBody
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
                Change Password
            </Text>
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.error}></Text>}
            <Text style = {styles.subheading}>
                Enter new password
            </Text>
            <TextField
                placeholder={"Password"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                    borderColor: borderColor[0]
                }}
                changeHandler={PasswordHandler}
                secureTextEntry={true}
            />
            <Text style = {{...styles.subheading,marginTop:12}}>
                Confirm password
            </Text>
            <TextField
                placeholder={"Password"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                    borderColor: borderColor[1]
                }}
                changeHandler={ConfirmPasswordHandler}
                secureTextEntry={true}
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
        alignSelf:'center',
        position:'relative',
        marginTop:16,
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
        marginTop: 10
    }
})
