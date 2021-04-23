import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';


const globalState = () => {
    const [profilepic, setProfilepic] = useState({uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'})
    const [profilename, setProfilename] = useState('Carlet User')
    const [walletamount, setWalletamount] = useState('0')
    
    useEffect(() => {
        // if(!props.fetched) {
        //     props.fetchRules();
        // }
        // console.log('mount it!');
        const profilepictureandname = async () => {
            
            try {
                let pic = await AsyncStorage.getItem('@profilepicture')
                console.log("pic: ", pic)
                if (pic != null){
                   setProfilepic({uri:pic})
                }
        
            } catch (e) {
                console.log("loggedout error: ", e)
            }
            try {
                let name = await AsyncStorage.getItem('@profilename')
                console.log("name: ", name)
                if (name != null){
                    setProfilename(name)
                }
                
        
            } catch (e) {
                console.log("loggedout error: ", e)
            }

            try {
                let wallet = await AsyncStorage.getItem('@walletamount')
                if (wallet != undefined){
                    setWalletamount(wallet)
                }
                
        
            } catch (e) {
                console.log("loggedout error: ", e)
            }
    
            
        }
        profilepictureandname()
        
      },[]);

    const actions = (action) => {
        const {type, payload} = action
        switch (type){
            case 'setProfilepic':
                return setProfilepic(payload)
            case 'getProfilepic':
                return profilepic
            case 'setProfilename':
                return setProfilename(payload)
            case 'getProfilename':
                return profilename
            case 'setWalletamount':
                return setWalletamount(payload)
            case 'getWalletamount':
                return walletamount
            default:
                return "default"
        }
    }
    return ({profilepic, profilename, walletamount, actions})
}

export default globalState


