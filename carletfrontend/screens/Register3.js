import React,  { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Platform, Keyboard } from 'react-native';
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Register1( {navigation} ) {

    const [borderColor, setborderColor] = useState("black");
    const [iban,setIban] = useState(``)
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
                quality:1
            })
            console.log(result)
            if (!result.cancelled)
            {
                setImage(result.uri)
            }
        } catch (error) {
            console.log("bc", error)
        }
        
        
    }

    const ibanHandler = (iban) => {
        setIban(iban)
    }

    const validateInput = () =>
    {
        if (iban === `` || image === null)
        {
            let field = "black"

            if (iban === ``) {
                seterrorMsg(`Please input IBAN number`);
                console.log("IBAN fields is empty");
                field = "red"
            } else if (iban.length !== 24) {
                seterrorMsg(`IBAN number should have 24 digits`);
                console.log("IBAN number not of correct length");
                field = "red"
            } else if (image === null){
                seterrorMsg(`Please upload IBAN picture`);
                console.log("Pic not uploaded");
            } 
            seterror(true);
            setborderColor(field);    
            
        } else if (iban.length !== 24) {
            seterrorMsg(`IBAN number should have 24 digits`);
            console.log("IBAN number not of correct length");
            seterror(true);
            setborderColor("red")
        } else {
            console.log("ALL GOOD!");
            console.log("image", image);
            seterrorMsg("");
            seterror(false);
            setborderColor("black");
            navigation.navigate("Register4")
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
                IBAN
            </Text>
            <TextField
                placeholder={"IBAN Number"}
                style={{
                    position: "relative",
                    marginTop: 16,
                    left:16,
                    borderColor: borderColor,
                }}
                changeHandler={ibanHandler}
                secureTextEntry={false}
            />
            <Text style = {styles.key}>
                Profile Picture
            </Text>
            <TouchableButton
                title="UPLOAD"
                onPress={PickImage}
                buttonposition={styles.uploadposition}>
            </TouchableButton>

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
        left:32,
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
    }
})