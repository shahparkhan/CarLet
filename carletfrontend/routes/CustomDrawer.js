import React, { useEffect, useState, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./../shared/context";

const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }
    return(
        <Modal transparent visible={showModal} >
            <View style = {styles.modalBackground}>
                <View style = {styles.modalContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}


export default function ContentContainer( {navigation} ){
    const [visible,setVisible] = useState(false);
    const [image,setImage] = useState(null);

    const {profilepic, profilename, walletamount} = useContext(Context)

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
            if (!result.cancelled)
            {
                setImage(`data:image/jpeg;base64,${result.base64}`)
                
                const apiBody = JSON.stringify({
                    profile_picture: `data:image/jpeg;base64,${result.base64}`
                }) 
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

                try {

                    response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/updateprofilepic/${myuuid}/`,{
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
                    
                    
                } catch (error) {
                    console.log('error: ', error)
                }

                try {
            
      
                    response = await fetch('http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/getprofileinfo/',{
                    method: 'post',
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${mytoken}`
                    },
                    body: JSON.stringify({user_id:myuuid})
                    })
                    responseJson = await response.json()
                    console.log('server response: ', responseJson)
                    
                    if (responseJson.Success != undefined){
                        
                        try {
                            await AsyncStorage.setItem('@profilepicture', responseJson.picture)
                            actions({type:"setProfilepic", payload:{uri:responseJson.picture}})
                        
                        } catch (e) {
                        }
                    } 
                  } catch (error) {
                    console.log("err", error)
            
                }


            }
        } catch (error) {
            console.log("bc", error)
        }
        
        
        
    }

    
    


  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("@isloggedin", "0");
    } catch (e) {
      console.log("loggedout error: ", e);
    }
    navigation.navigate("Welcome");
  };

  return(
        <TouchableOpacity activeOpacity = {1} style = {styles.drawerTransparent}   >
            <TouchableOpacity activeOpacity = {1} style = {styles.drawer}>

                <View style = {{justifyContent: "flex-start", backgroundColor:"#ffc107"}}>
                    <ModalPopUp visible = {visible}>
                        <View style = {{alignItems:'center'}}>
                            <View style = {styles.header}>
                                <TouchableOpacity onPress = {()=>setVisible(false)}>
                                <Image source = {require("./../assets/cancel.png")} style = {{height:15,width:15}} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {{alignItems:'center'}}>
                        <Image source={profilepic} style = {{height:150,width:150,marginVertical:10,borderRadius:50}}/>
                        </View>

                        <TouchableOpacity onPress = {PickImage}>
                            <Text style = {{textAlign:'center',position:'relative',fontFamily:"Nunito-SemiBold",
                            fontSize: 14,}}>
                                Upload new photo
                            </Text>
                        </TouchableOpacity>
                    </ModalPopUp>
                    <TouchableOpacity onPress = {()=> setVisible(true) }>
                    <Image source={profilepic} style = {styles.imageStyle}/>
                    </TouchableOpacity>
                    
                    
                        <Text style = {styles.name}>
                            {profilename}
                        </Text>
                        
                        <View style={styles.walletstyle}>
                            <Image
                                source = {require('./../assets/wallet.png')}
                                style = {styles.walletImage}>
                            </Image>
                            
                            <Text style = {styles.name}>
                                {walletamount}
                            </Text>
                        </View>
                    
                </View>
                <ScrollView>
                    
                    {/* // navigation.navigate("AccountSettings") */}
                    

                    <TouchableOpacity onPress = {() => navigation.navigate("RentRequests")}>
                        <View style = {styles.optionStyle} >
                            <MaterialCommunityIcons name="bell" size={24} color="black" style={styles.testIcon}/>
                            <Text style = {styles.testText}> Rent Requests </Text >
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate("RegisterVehicle1")}
                    >
                        <View style={styles.optionStyle}>
                        <MaterialIcons
                            name="directions-car"
                            size={24}
                            color="black"
                            style={styles.testIcon}
                        />
                        <Text style={styles.testText}> Register Vehicle </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Wallet3")}>
                        <View style={styles.optionStyle}>
                        <MaterialIcons
                            name="account-balance-wallet"
                            size={24}
                            color="black"
                            style={styles.testIcon}
                        />
                        <Text style={styles.testText}> Wallet </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("FavVehicles")}>
                        <View style={styles.optionStyle}>
                        <MaterialCommunityIcons
                            name="heart"
                            size={24}
                            color="black"
                            style={styles.testIcon}
                        />
                        <Text style={styles.testText}> Favourite Vehicles </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("History1")}>
                        <View style={styles.optionStyle}>
                        <MaterialIcons
                            name="history"
                            size={24}
                            color="black"
                            style={styles.testIcon}
                        />
                        <Text style={styles.testText}> History </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {() => navigation.navigate("AccountMenu")}>
                        <View style = {styles.optionStyle} >
                            <MaterialIcons name="settings" size={24} color="black" style={styles.testIcon}/>
                            <Text style = {styles.testText}> Account Settings </Text >
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress = {logoutHandler}>
                        <View style = {styles.optionStyle} >
                            <MaterialIcons name="logout" size={24} color="black" style={styles.testIcon}/>
                            <Text style = {styles.testText}> Logout </Text >
                        </View>
                    </TouchableOpacity>

                    


                </ScrollView>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({

    optionStyle:{
        flex:1, 
        flexDirection: 'row', 
        'marginTop': 25
    },

    modalBackground:{
        flex:1,
        backgroundColor:"rgba(0,0,0,0.2)",
        justifyContent:'center',
        alignItems:'center',
    },
    modalContainer:{
        width:'80%',
        backgroundColor:"white",
        paddingHorizontal:20,
        paddingVertical:30,
        borderRadius:20,
        elevation:20,
    },
    header:{
        width:'100%',
        height:10,
        alignItems:"flex-end",
        justifyContent:"center"
    },

    drawerTransparent: {
        flex:1,
        backgroundColor:'transparent'
    },
    imageStyle:{
        position:"relative",
        height:80,
        width:80,
        marginTop: 40,
        borderRadius:40,
        marginLeft:16,
    },
    drawer:{
        flex:1,
        backgroundColor:'white'
    },
    name:{
        fontSize: 16,
        textAlign: 'left',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 8,
        color: 'white',
        fontFamily:"Nunito-Bold",
        justifyContent:"flex-start"
    },
    drawerText:{
        fontFamily:"Nunito-Bold",
        fontSize: 14,
        textAlign: 'center',
        color: 'black',

    }, 
    testIcon: {
        marginLeft: 16,
        alignSelf: "center"
    },
    testText: {
        fontFamily:"Nunito-Regular",
        fontSize: 14,
        textAlign: 'center',
        color: 'black',
        marginLeft:8,
        alignSelf: "center"
    },
    walletstyle:{
        flexDirection:"row",
        justifyContent:"flex-start",
        marginBottom: 16,
    },
    walletImage:{
        height:24,
        width:24,
        marginLeft:16,
        marginTop: 8,
        justifyContent:"flex-start"
    },
})