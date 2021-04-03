
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading'
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font'
import Welcome from './screens/welcome'
import Login from './screens/login'
import Signup from './screens/signup'
// import SvgComponent from './svgcomponents/yellowvector'

const getFonts = () => {
  return Font.loadAsync({
    'Nunito-Black': require('./shared/fonts/Nunito-Black.ttf'),
    'Nunito-BlackItalic': require('./shared/fonts/Nunito-BlackItalic.ttf'),
    'Nunito-Bold': require('./shared/fonts/Nunito-Bold.ttf'),
    'Nunito-BoldItalic': require('./shared/fonts/Nunito-BoldItalic.ttf'),
    'Nunito-ExtraBold': require('./shared/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-ExtraBoldItalic': require('./shared/fonts/Nunito-ExtraBoldItalic.ttf'),
    'Nunito-ExtraLight': require('./shared/fonts/Nunito-ExtraLight.ttf'),
    'Nunito-ExtraLightItalic': require('./shared/fonts/Nunito-ExtraLightItalic.ttf'),
    'Nunito-Italic': require('./shared/fonts/Nunito-Italic.ttf'),
    'Nunito-Light': require('./shared/fonts/Nunito-Light.ttf'),
    'Nunito-LightItalic': require('./shared/fonts/Nunito-LightItalic.ttf'),
    'Nunito-Regular': require('./shared/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./shared/fonts/Nunito-SemiBold.ttf'),
    'Nunito-SemiBoldItalic': require('./shared/fonts/Nunito-SemiBoldItalic.ttf')
  })
}



export default function App() {


  const [email,setEmail] = React.useState(``)
  const [password,setPassword] = React.useState(``)  
  const [fontLoaded, setFontsLoaded] = useState(false)


  const submitEmail = (val) =>{
    setEmail(val)
  }
  const submitPassword = (val) =>{
    setPassword(val)
  }
  

  if (fontLoaded) {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor = "#ffa000"
        />
        <Signup />
      </View>
    )
  } else {
      return (
        <AppLoading 
          startAsync = {getFonts}
          onFinish = {() => setFontsLoaded(true)}
          onError = {console.warn}
        />
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fafafa"
  },
  statusbar: {
    color: '#ccc100',
    height: 30
  }
});


//submitEmail = {submitEmail} submitPassword = {submitPassword}