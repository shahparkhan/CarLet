import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';

export default function Register1( {navigation} ) {

    const [borderColor, setborderColor] = useState("black");
    const [Nic,setNic] = useState(``)
    const [errorMsg, seterrorMsg] = useState(``);
    const [error, seterror] = useState(false);
    const [image,setImage] = useState(null);
    const [Uploadmsg, setUploadmsg] = useState("");


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
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
            })
            
            if (!result.cancelled)
            {
                const manipResult = await ImageManipulator.manipulateAsync(result.uri,[{resize: {height:500}}],{ compress: 0.3, base64:true});
                setImage(`data:image/jpeg;base64,${manipResult.base64}`)
                setUploadmsg("Image Uploaded")  
            }
        } catch (error) {
            console.log("bc", error)
        }
        
        
    }

    const NICHandler = (nic) => {
        setNic(nic)
    }

    

    const validateInput = async () =>
    {
        if (Nic === `` || image === null)
        {
            let field = "black"

            if (Nic === ``) {
                seterrorMsg(`Please input NIC number`);
                console.log("NIC fields is empty");
                field = "red"
            } else if (Nic.length !== 13) {
                seterrorMsg(`NIC number should have 13 digits`);
                console.log("NIC number not of correct length");
                field = "red"
            } else if (image === null){
                seterrorMsg(`Please upload NIC picture`);
                console.log("Pic not uploaded");
            } 
            seterror(true);
            setborderColor(field);    
            
        } else if (Nic.length !== 13) {
            seterrorMsg(`NIC number should have 13 digits`);
            console.log("NIC number not of correct length");
            seterror(true);
            setborderColor("red")
        } else {
            
            // console.log("image", image);
            

            console.log("ALl GOOD!");
      
            seterrorMsg("");
            seterror(false);
            setborderColor("black");

            const details = {
                nic: Nic,
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
                let response = await fetch('http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/uservalidation/',{
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
            <Text style = {styles.registertext}>
                Register
            </Text>
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.error}></Text>}
            
            <Text style = {styles.subheading}>
                NIC
            </Text>
            <TextField
                placeholder={"NIC Number"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                    borderColor: borderColor,
                }}
                changeHandler={NICHandler}
                secureTextEntry={false}
                keyboardType={"numeric"}
            />
            <Text style = {styles.key}>
                NIC Picture
            </Text>
            <View style={{alignItems:"center", alignSelf:"flex-end", marginRight:32}}>
                <TouchableButton
                    title="UPLOAD"
                    onPress={PickImage}
                    buttonposition={styles.uploadposition}>
                </TouchableButton>
                <View style={styles.uploadmsg}>
                    <Text style={styles.greenText}>{Uploadmsg}</Text>
                </View>
            </View>
            

            <Image
                style={styles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
            </KeyboardAwareScrollView>
            <TouchableButton
                title="NEXT"
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

    registertext: {
        position: 'relative',
        marginTop: 36,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    subheading:{
        left:32,
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
        marginLeft:32,
        marginTop: 52,
        width:"60%"

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
    uploadmsg: {
      flexDirection: "row",
    },
    greenText: {
      fontFamily: "Nunito-Regular",
      color: "green",
    },
})
