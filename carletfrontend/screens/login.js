import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions,TextInput, Button } from 'react-native';





export default function Login() {


    const [email,setEmail] = React.useState(``)
    const [password,setPassword] = React.useState(``)

    const changeHandler=(val)=>{
        setEmail(val)
    }
    const changeHandlerPassword=(val)=>{
        setPassword(val)
    }
    return (
      <View style={styles.container}>
          <Image 
                style = {styles.yellowvector}
                source={require('./../assets/login.png')}
            />
            <TextInput style = {styles.input} placeholder = 'Email' onChangeText = { changeHandler } />
            <TextInput style = {styles.input} placeholder = 'Password' onChangeText = { changeHandlerPassword } /> 
            <Button onPress={()=>console.log(email)} title = 'LOGIN' color = '#777'/>
            <Image
                style = {styles.smallcar}
                source = {require('./../assets/smallcar.png')}
            />
      </View>
    );
}
const win = Dimensions.get('window')

const height = (win.width/350)*320

const styles = StyleSheet.create({

    yellowvector: {
        width: win.width,
        height: height
    },
    container: {
        flex: 1
    },
    smallcar :{
        width: 40,
        height: 20,
        position: "absolute", bottom: 16, right: 16
        //position: "absolute", bottom: 0, //alignSelf: "flex-end"
    
        //paddingBottom: 30  
        // paddingright
        // margin
    },
    input:{
        borderWidth: 1,
        borderColor: '#777',
        padding:8,
        margin:10,
        width:200
    },
    welcometext: {
        position: 'relative',
        top: -50,
        alignSelf: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    bodytext: {
        width: 300,
        position: 'relative',
        top: -40,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center'
    }
})

