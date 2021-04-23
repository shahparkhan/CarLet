import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Register1( {navigation} ) {

    const [errorMsg, seterrorMsg] = useState(``);
    const [error, seterror] = useState(false);
    const [image,setImage] = useState(null);

    useEffect(()=>
    {
        async function fetchData(){
            if (Platform.OS !== 'web')
            {
                try {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if ( status !== `granted`)
                    {
                        alert('Permission denied!')
                    }
                } catch (error) {

                }
                
            }
        }
        fetchData()
        
    },[])

    const PickImage = async () =>{
        try {
            let result  = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1,
                base64:true,
            })
            // console.log("rrr", result)
            setImage(`data:image/jpeg;base64,${result.base64}`)
            if (!result.cancelled)
            {
                // setImage(result.uri)
            }
        } catch (error) {
            console.log("bc", error)
        }
        
        
    }
    const validateInput = async () =>
    {
        if (image === null)
        {

            seterrorMsg(`Please upload NIC picture`);
            console.log("Pic not uploaded");
            seterror(true);
            
        } 
        else {

            console.log("ALl GOOD!");      
            seterrorMsg("");
            seterror(false);

            const details = {
                nicPicture: image,
            }

            // console.log("forward this: ", details)

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
                {navigation.getParam('title')}
            </Text>
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.error}></Text>}
            
            <Text style = {styles.subheading}>
                {navigation.getParam('subheading')}
            </Text>
            <Text style = {styles.key}>
                doc snaps 
            </Text>
            <TouchableButton
                title="UPLOAD"
                onPress={PickImage}
                buttonposition={styles.uploadposition}>
            </TouchableButton>

            </KeyboardAwareScrollView>
            <TouchableButton
                title="UPDATE"
                onPress={validateInput}
                buttonposition={styles.buttonposition}>
            </TouchableButton>
            <Image
                style={styles.smallcar}
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
        fontFamily:"Nunito-SemiBold",
        fontSize: 24,
        width:win.width
    },
    key:{
        fontFamily:"Nunito-Regular",
        fontSize:16,
        position:'relative',
        left:16,
        marginTop: 52,

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
        marginTop: -30,
        alignSelf: "flex-end",
        right:40
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
    },
})
