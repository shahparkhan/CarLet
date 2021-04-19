import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity,Image,ScrollView} from 'react-native';
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView,DrawerItemList,DrawerActions } from 'react-navigation-drawer';
import { Entypo,MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function ContentContainer( {navigation} ){
        
    const logoutHandler = async () => {
        try {
          await AsyncStorage.setItem('@isloggedin', '0')
  
        } catch (e) {
            console.log("loggedout error: ", e)
        }
        navigation.navigate("Welcome")
    }

    return(
        <TouchableOpacity activeOpacity = {1} style = {styles.drawerTransparent}   >
            <TouchableOpacity activeOpacity = {1} style = {styles.drawer}>
                <View style = {{height:178, backgroundColor:"#ffc107"}}>
                    <Image source={require("./../assets/jenny.jpg")} style = {styles.imageStyle}/>
                    <Text style = {styles.name}>
                        Jennifer
                    </Text>
                </View>
                <ScrollView>
                    

                    
                    <TouchableOpacity onPress = {() => {console.log("pressed")}}>
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
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 16,
        marginTop: 16,
        color: 'white',
        fontFamily:"Nunito-Bold",
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
    }
})





// function Sidebar({...props}){

//     return(
//         <DrawerContentScrollView {...props}>
//             <DrawerItemList {...props}/>

//             <DrawerItem 
//             label = "Account Settings" 
//             icon ={()=> <MaterialIcons name="settings" size={24} color="black" />}
//             onPress = {(()=>props.navigation.navigate('Logout')) }  />


//         </DrawerContentScrollView>
//     );
// }
