import React,{Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight,TouchableOpacity,Image,ScrollView} from 'react-native';
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView,DrawerItemList,DrawerActions } from 'react-navigation-drawer';
import { Entypo,MaterialIcons } from '@expo/vector-icons';
import { Icon } from 'native-base';


export default function ContentContainer( {navigation} ){
        return(
            <TouchableOpacity activeOpacity = {1} style = {styles.drawerTransparent}   >
                <TouchableOpacity activeOpacity = {1} style = {styles.drawer}>
                    <View style = {{height:164, backgroundColor:"#ffc107"}}>
                        <Image source={require("./../assets/jenny.jpg")} style = {styles.imageStyle}/>
                        <Text style = {styles.name}>
                            Jennifer Conelly
                        </Text>
                    </View>
                    <ScrollView>

                        <View style = {{height:50}} >
                            <Text style = {styles.drawerText}> Account Settings </Text >
                            <MaterialIcons name="settings" size={24} color="black" />
                        </View>



                        <TouchableHighlight onPress = {()=>navigation.navigate('Welcome')}>
                            <View style = {{height:50}} >
                                <Text style = {styles.drawerText}> Logout </Text >
                                <MaterialIcons name="logout" size={24} color="black" />
                            </View>
                        </TouchableHighlight>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    
}


const styles = StyleSheet.create({
    drawerTransparent: {
        flex:1,
        backgroundColor:'transparent'
    },
    imageStyle:{
        height:80,
        width:80,
        marginTop:40,
        borderRadius:75,
        left:16,
    },
    drawer:{
        flex:1,
        backgroundColor:'white'
    },
    name:{
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontFamily:"Nunito-Bold",
    },
    drawerText:{
        fontFamily:"Nunito-Bold",
        fontSize: 14,
        textAlign: 'center',
        color: 'black',

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
