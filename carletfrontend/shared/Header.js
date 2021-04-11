import React from 'react';
import {StyleSheet,Text,View,Pressable} from 'react-native';
import { Entypo, MaterialIcons} from '@expo/vector-icons';


export default function Header1 ({navigation}){

    const openMenu = () =>{
        navigation.openDrawer()
        console.log(`menu opened`)
    }

    const goHome = () =>{
        navigation.navigate("Welcome")
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
