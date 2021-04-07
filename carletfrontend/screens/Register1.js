import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
// import * as ImagePicker from 'expo-image-picker';
// import Constants from 'expo-constants';

export default function Register1() {

    const [borderColor, setborderColor] = useState("black");
    const [Nic,setNic] = useState(``)
    const [errorMsg, seterrorMsg] = useState(``);
    const [error, seterror] = useState(false);
    const [image,setImage] = useState(null);

    // useEffect( async ()=>
    // {
    //     if (Platform.OS !== 'web')
    //     {
    //         const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //         if ( status !== `granted`)
    //         {
    //             alert('Permission denied!')
    //         }
    //     }
    // },[])

    // const PickImage = async () =>{
    //     let result  = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing:true,
    //         aspect:[4,3],
    //         quality:1
    //     })
    //     console.log(result)
    //     if (!result.cancelled)
    //     {
    //         setImage(result.uri)
    //     }
    // }

    const NICHandler = (nic) => {
        setNic(nic)
    }

    const validateInput = () =>
    {
        if (Nic === ``)
        {
            seterror(true);
            seterrorMsg(`Some fields are empty`);
            setborderColor("red");
            console.log("Some fields are empty");
        }

    }

    return (
        <View style={styles.container}>
            <Text style = {styles.registertext}>
                Register
            </Text>
            <Text style = {styles.subheading}>
                NIC
            </Text>
            <TextField
                placeholder={"NIC Number"}
                style={{
                    position: "absolute",
                    top: 221,
                    left:16,
                    borderColor: borderColor,
                }}
                changeHandler={NICHandler}
                secureTextEntry={false}
            />
            {error ? <Text style={styles.error}>{errorMsg}</Text> : <></>}
            <Text style = {styles.key}>
                NIC Picture
            </Text>
            <TouchableButton
                title="Upload"
                onPress={console.log(`hell`)}
                buttonposition={styles.uploadposition}>
            </TouchableButton>

            <Image
                style={styles.smallcar}
                source={require("./../assets/smallcar.png")}
            />
            <TouchableButton
                title="Next"
                onPress={validateInput}
                buttonposition={styles.buttonposition}>
            </TouchableButton>

        </View>
    );
}

const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height - 104;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
    

    container: {
        flex: 1
    },

    registertext: {
        position: 'relative',
        top: 116,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    subheading:{
        left:16,
        position:'absolute',
        top:172,
        fontFamily:"Nunito-SemiBold",
        fontSize: 24,
        width:49
    },
    key:{
        fontFamily:"Nunito-Regular",
        fontSize:16,
        position:'absolute',
        left:16,
        top:313

    },

    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: win.height - 36,
        right: 16,
    },
    uploadposition : {
        position: "absolute",
        top: 293,
        marginTop:10,
        right:40
    },
    buttonposition: {
        position: "absolute",
        alignSelf:'center',
        top: buttonHeight,
        marginTop: 10,
    },
    error: {
        color: "tomato",
        alignSelf: "center",
        position: "absolute",
        top: buttonHeight - 40
    }
})
