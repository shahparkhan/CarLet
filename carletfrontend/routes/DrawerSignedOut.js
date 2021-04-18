import React from 'react';
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView,DrawerItemList } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './HomeStack';
import {StyleSheet, View, SafeAreaView,Image,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import { Header } from 'react-native/Libraries/NewAppScreen';
import { Container, Content, Text, Header, Left, Body, Title, Right, Icon } from 'native-base';
import ContentComponent from './customDrawer';
import SignedOutStack from './SignedOutStack'


const drawers = {
    Logout:{
        screen:SignedOutStack
    }
}

const RootDrawerNavigator = createDrawerNavigator(drawers,
    config = {
        initialRouteName: 'Logout',
        contentComponent: ContentComponent,
        drawerBackgroundColor: 'transparent'

    });


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





// const CustomDrawers = (props) =>{

//     return(
//         <DrawerContentScrollView {...props}>
            
//             <View style = {{height:164, backgroundColor:"#ffc107"}}>
//                 <Image source={require("./../assets/jenny.jpg")} style = {styles.imageStyle}/>
//             </View>
            
//              <DrawerItemList {...props} /> 
//                 <DrawerItem
//                     label="Logout"
//                     icon = {() => <MaterialIcons name = 'logout' size = {24} color="black" />}
//                     onPress={() => console.log('1hk')}
//                 />
//         </DrawerContentScrollView>   
//     )
// }













// const MyDrawer = createDrawerNavigator({
//     Logout:{
//         screen:HomeStack
//     }
// });



// const AppDrawer = () =>{
//     return(
//         <MyDrawer.Navigator drawerContent = { props => <Sidebar {...props}/>}>
//             <MyDrawer.Screen
//                 name = "Logout"
//                 component = {HomeStack}
//                 options = {
//                     {
//                         drawerIcon : ({focused,color,size}) => (
//                             <MaterialIcons name = 'logout' size = {24} color="black" />
//                         ),
//                     }
//                 }
//             />

//         </MyDrawer.Navigator>
//     )
// }
