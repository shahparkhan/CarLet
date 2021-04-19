import React from 'react';
import {StyleSheet,Text,View,Pressable} from 'react-native';
import { Entypo, MaterialIcons} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Header1 ({navigation}){

    const openMenu = () =>{
        navigation.openDrawer()
        console.log(`menu opened`)
    }

    const goHome = async () =>{
        let isverified = false
        let isregistered = false
        try {
            const val1 = await AsyncStorage.getItem('@isverified')
            console.log("val1: ", val1)
            if (val1 == '1'){
                isverified = true
            }     
        } catch (e) {
            console.error('Failed to get verification state')
        }


        try {
            const val2 = await AsyncStorage.getItem('@isregistered')
            console.log("val2: ", val2)
            if (val2 == '1'){
                isregistered = true
            } 
        } catch (e) {
            console.error('Failed to get registration state')
        }

          
        if(isregistered){
            if (isverified){
                navigation.navigate('Home')
            } else{
                navigation.navigate('Register6')
            }
        } else{
            navigation.navigate('Register')
        }
    }
    return(
        <View style = {styles.header}>

            <Entypo name = 'menu' size = {24} color="white" onPress = {openMenu} style={styles.icon} />
            <Text></Text>
            <Entypo name = 'home' size={24} color="white" onPress = {goHome} style = {styles.home}/>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        width:'100%',
        height:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#ffc107",
    },
    icon :{
        position:'absolute',
        left:16,

    },
    home:{
        position:'absolute',
        right:16
    }

})
