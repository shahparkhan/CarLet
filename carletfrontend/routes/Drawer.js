import React from 'react';
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView,DrawerItemList } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import {StyleSheet, View, SafeAreaView,Image,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Header } from 'react-native/Libraries/NewAppScreen';
// import { Drawer } from 'native-base';
import SignedInStack2 from './SignedInStack2'
import SignedOutStack from './SignedOutStack'


const CustomDrawers = (props) =>{

    return(
        <DrawerContentScrollView {...props}>
            
            <View style = {{height:164, backgroundColor:"#ffc107"}}>
                <Image source={require("./../assets/jenny.png")} style = {styles.imageStyle}/>
            </View>
            
             <DrawerItemList {...props} /> 
                <DrawerItem
                    label="Logout"
                    icon = {() => <MaterialIcons name = 'logout' size = {24} color="black" />}
                    onPress={() => console.log('1hk')}
                />


        </DrawerContentScrollView>
        
    )
}

const drawers = {
    Home: {
        screen: SignedInStack2,
    },
    Logout:{
        screen:SignedOutStack
    }

}

const RootDrawerNavigator = createDrawerNavigator(drawers);

// ,
//     config = {
//         initialRouteName: 'Logout',
//         contentComponent: CustomDrawers(drawers)
//     }


const styles = StyleSheet.create({
    imageStyle:{
        height:80,
        width:80,
        marginTop:40,
        borderRadius:75,
        left:16,
    }
})
export default createAppContainer(RootDrawerNavigator)





{/* <ScrollView>
<DrawerItems {...props}/> */}
