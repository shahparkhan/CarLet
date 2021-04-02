import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './screens/welcome'
import Login from './screens/login'
import Signup from './screens/signup'
// import SvgComponent from './svgcomponents/yellowvector'

export default function App() {

  const [email,setEmail] = React.useState(``)
  const [password,setPassword] = React.useState(``)

  const submitEmail = (val) =>{
    setEmail(val)
  }
  const submitPassword = (val) =>{
    setPassword(val)
  }
  
  return (
    <View style={styles.container}>
      < Login  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


//submitEmail = {submitEmail} submitPassword = {submitPassword}