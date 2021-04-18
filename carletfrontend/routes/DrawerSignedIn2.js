import React from 'react';
import { createDrawerNavigator, DrawerItem,DrawerContentScrollView,DrawerItemList } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './HomeStack';
import {StyleSheet, View, SafeAreaView,Image,ScrollView} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
//import { Header } from 'react-native/Libraries/NewAppScreen';
import { Container, Content, Text, Header, Left, Body, Title, Right, Icon } from 'native-base';
import ContentComponent from './customDrawer';
import SignedIn2 from './SignedInStack2';


const drawers = {
    Logout:{
        screen:SignedIn2
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
