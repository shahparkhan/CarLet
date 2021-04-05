import React, { useState } from "react";
import { ScrollView, View, Image, StyleSheet, Dimensions, KeyboardAvoidingView } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import KeyboardAvoidingTextField from "../assets/components/KeyboardAvoidingTextField"

export default function Signup() {

  return (
      <View style={styles.viewContainer}>
        <Image 
          style={styles.yellowvector}
          source={require("./../assets/SignupVector.png")} 
        />

        <ScrollView>

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: -50}}
        />

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: -34}}
        />

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: -18}}
        />

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: -2}}
        />

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: 14}}
        />

        <TextField 
          placeholder={"Email"}
          style={{position: "relative", top: 30}}
        />

        </ScrollView>
                
        
        <TouchableButton
          buttonposition= {styles.buttonposition}
          title="Next"
          onPress={() => {
            console.log("Pressed");
          }}
        ></TouchableButton>


      </View>
    
  );
}

const win = Dimensions.get('window')

const buttonHeight = (win.height - 104)

const height = (win.width/350)*320

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    flex:1
  },
  yellowvector: {

    width: win.width,
    height: height
  },
  buttonposition: {
    position: "absolute",
    top: buttonHeight
  }
});
