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
            // console.log("rrr", result)
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
    const validateInput = async () =>
    {
        if (image === null)
        {

            seterrorMsg(`Please upload document picture`);
            console.log("Pic not uploaded");
            seterror(true);
            
        } 
        else {

            seterrorMsg("");
            seterror(false);

            
            let apiBody
            // console.log("forward this: ", details)
            if (navigation.getParam('title') === 'Vehicle Registration Docs') {
                console.log("here1")
                apiBody = JSON.stringify({
                    reg_papers: image,
                })
            }

            if (navigation.getParam('title') === 'Vehicle Insurance Docs') {
                console.log("here2")
                apiBody = JSON.stringify({
                    insurance_papers: image,
                })
            }

            if (navigation.getParam('title') === 'Vehicle Tracker Docs') {
                console.log("here3")
                apiBody = JSON.stringify({
                    tracker_papers: image,
                })
            }

            
            if (apiBody != {}) {
                let mytoken = ''

                try {
                    mytoken = await AsyncStorage.getItem('@mytoken')
                
                } catch (error) {
                    console.error('Failed to get token: ', error)
                }
                let vehicle_id =  navigation.getParam('vehicle_id')
    
                try {
                    response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/vehiclesetting/${vehicle_id}/`,{
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
            <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center", marginBottom: 16, marginTop:32}}>
            <Text style = {styles.key}>
                {navigation.getParam('title')} Picture
            </Text>
            <View style={{alignItems:"center", alignSelf:"flex-end", marginRight:16}}>
                <TouchableButton
                    title="UPLOAD"
                    onPress={PickImage}
                    buttonposition={styles.uploadposition}>
                </TouchableButton>
                <View style={styles.uploadmsg}>
                    <Text style={styles.greenText}>{Uploadmsg}</Text>
                </View>
            </View>
            </View>
            

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
        width:"80%",
        left:16,
        position:'relative',
        marginTop:16,
        fontFamily:"Nunito-SemiBold",
        fontSize: 24,
    },
    key:{
        fontFamily:"Nunito-Regular",
        fontSize:16,
        position:'relative',
        marginLeft:16,
        width:"50%",
        justifyContent:"flex-start"
    },

    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: win.height - 36,
        right: 16,
    },
    uploadposition : {
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
