import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import Welcome from "./screens/Welcome";
import Login from "./screens/Login";
import SignUp1 from "./screens/SignUp1/";
import SignUp0 from "./screens/SignUp0/";
import Register from './screens/Register'
import Register1 from './screens/Register1'
import Register4 from './screens/Register4'
import Register5 from './screens/Register5'
import Register6 from './screens/Register6'
import SignedOutNavigator from './routes/SignedOutStack'
import SignedInNavigator from './routes/SignedInStack'
import SignedInNavigator2 from './routes/SignedInStack2'
import SignedInNavigator3 from './routes/SignedInStack3'
import DrawerSignedOut from './routes/DrawerSignedOut';
import DrawerSignedIn from './routes/DrawerSignedIn';
import DrawerSignedIn2 from './routes/DrawerSignedIn2';
import DrawerSignedIn3 from './routes/DrawerSignedIn3';
import { registerRootComponent } from "expo";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const [fontLoaded, setFontsLoaded] = useState(false);


  const [loginstate, setLoginstate] = useState(false);
  const [registeredstate, setRegisteredstate] = useState(false);
  const [verifiedstate, setVerifiedstate] = useState(false);

  const getFonts = async () => {
    
    // try {
    //   await AsyncStorage.setItem('@isloggedin', '0')

    // } catch (e) {
    // }
    try {
      await AsyncStorage.setItem('@isverified', '0')

    } catch (e) {
    }
    try {
      await AsyncStorage.setItem('@isregistered', '0')

    } catch (e) {
    }


    let useruuid = ''
    let mytoken = ''
    let gotuuid = false

    try {
      useruuid = await AsyncStorage.getItem('@useruuid')
      gotuuid = true
    } catch (e) {
      console.error('Failed to get uuid')
    }

    try {
      mytoken = await AsyncStorage.getItem('@mytoken')
    } catch (e) {
      console.error('Failed to get token')
    }

    
    if (gotuuid){
      try {
      
        let response = await fetch('https://carlet.pythonanywhere.com/checkregistration/',{
        method: 'post',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        body: JSON.stringify({user_id:useruuid})
        })
        let responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson.Success === "User has Registered"){
            setRegisteredstate(true);
            try {
              await AsyncStorage.setItem('@isregistered', '1')
              
            } catch (e) {
            }
        } else {
          try {
            await AsyncStorage.setItem('@isregistered', '0')
            
          } catch (e) {
          }
        }
      } catch (error) {

      }


      try {
      
        response = await fetch('https://carlet.pythonanywhere.com/checkverification/',{
        method: 'post',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        body: JSON.stringify({user_id:useruuid})
        })
        responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson.Success === "User is Verified"){
            setVerifiedstate(true);
            try {
              await AsyncStorage.setItem('@isverfied', '1')
              
            } catch (e) {
            }
        } else {
          try {
            await AsyncStorage.setItem('@isverified', '0')
            
          } catch (e) {
          }
        }
      } catch (error) {

      }


    }
    

      
    
    try {
      const val = await AsyncStorage.getItem('@isloggedin')
      if (val === '1'){
        console.log("ALREADY LOGGED IN")
        setLoginstate(true)
      }


    } catch (e) {
      console.error('Failed to save name.')
    }
    
    return Font.loadAsync({
      "Nunito-Black": require("./shared/fonts/Nunito-Black.ttf"),
      "Nunito-BlackItalic": require("./shared/fonts/Nunito-BlackItalic.ttf"),
      "Nunito-Bold": require("./shared/fonts/Nunito-Bold.ttf"),
      "Nunito-BoldItalic": require("./shared/fonts/Nunito-BoldItalic.ttf"),
      "Nunito-ExtraBold": require("./shared/fonts/Nunito-ExtraBold.ttf"),
      "Nunito-ExtraBoldItalic": require("./shared/fonts/Nunito-ExtraBoldItalic.ttf"),
      "Nunito-ExtraLight": require("./shared/fonts/Nunito-ExtraLight.ttf"),
      "Nunito-ExtraLightItalic": require("./shared/fonts/Nunito-ExtraLightItalic.ttf"),
      "Nunito-Italic": require("./shared/fonts/Nunito-Italic.ttf"),
      "Nunito-Light": require("./shared/fonts/Nunito-Light.ttf"),
      "Nunito-LightItalic": require("./shared/fonts/Nunito-LightItalic.ttf"),
      "Nunito-Regular": require("./shared/fonts/Nunito-Regular.ttf"),
      "Nunito-SemiBold": require("./shared/fonts/Nunito-SemiBold.ttf"),
      "Nunito-SemiBoldItalic": require("./shared/fonts/Nunito-SemiBoldItalic.ttf"),
    });
  };


  const submitEmail = (val) => {
    setEmail(val);
  };
  const submitPassword = (val) => {
    setPassword(val);
  };

  if (fontLoaded) {
    if (loginstate){
      if (registeredstate) {
        if (verifiedstate) {
          return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#ffa000" />
              <DrawerSignedIn3 />
            </View>
          );
        } else {
          return (
            <View style={styles.container}>
              <StatusBar backgroundColor="#ffa000" />
              <DrawerSignedIn2 />
            </View>
          );
        }
      } else {
        return (
          <View style={styles.container}>
            <StatusBar backgroundColor="#ffa000" />
            <DrawerSignedIn />
          </View>
        );
      }
      
    } else {
      return (
        <View style={styles.container}>
          <StatusBar backgroundColor="#ffa000" />
          <DrawerSignedOut />
        </View>
      );
    }

  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  statusbar: {
    color: "#ccc100",
    height: 30,
  },
});

//submitEmail = {submitEmail} submitPassword = {submitPassword}
