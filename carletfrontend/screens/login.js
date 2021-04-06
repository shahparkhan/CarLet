import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";

export default function Login() {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const [borderColor, setborderColor] = useState(["black", "black"]);
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");

  const emailHandler = (e) => {
    setEmail(e);
  };

  const passHandler = (e) => {
    setPassword(e);
  };

  const anyfieldEmpty = () => {
    if (password == "" || email == "") {
      return true;
    }
    return false;
  };

  const validateEmailFromDataBase = (addr) => {
    const emailList = [
      "ashir1999@gmail.com",
      "adnan.abbas@lums.com", 
      "shahparnafeeskhan@gmail.com",
    ];
    console.log("EMAIL:::", addr, emailList.includes(addr));
    return emailList.includes(addr);
  };

  const validateInput = () => {
    console.log(email, password);
    if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some fields are empty`);
      
      let field1 = "black"
      let field2 = "black"
      
      if (email === ""){
        field1 = "red"
      } 
      if (password === "") {
        field2 = "red"
      } 
      
      setborderColor([field1, field2])
      console.log("Some fields are empty");

    } else if (!validateEmailFromDataBase(email)) {
      
      console.log("Invalidate Email");
      
      seterror(true);
      seterrorMsg("Invalid Email. Enter New Email");
      setborderColor(["red", "black"]);

    } else {
      
      console.log("ALL GOOD!");
      
      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black"]);
      
    }
  };

  return (
    <TouchableWithoutFeedback onPress = {() =>{Keyboard.dismiss()}}>

      <View style={styles.container}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
          <Image
            style={styles.yellowvector}
            source={require("./../assets/login.png")}
          />

          {error ? <Text style={styles.error}>{errorMsg}</Text> : <></>}

          <TextField
            style={{ 
              position: "relative", 
              alignSelf: "center",
              borderColor: borderColor[0]
            }}
            placeholder="Email"
            changeHandler={emailHandler}
            secureTextEntry={false}
            keyboardType={"email-address"}
          />

          <TextField
            style={{ 
              position: "relative", 
              alignSelf: "center", 
              marginTop: 16,
              borderColor: borderColor[1]
            }}
            placeholder="Password"
            changeHandler={passHandler}
            secureTextEntry={true}
            keyboardType={"default"}
          />
        </KeyboardAwareScrollView>
        
        

        <TouchableButton
          buttonposition={styles.buttonposition}
          title="LOGIN"
          onPress={validateInput}
        ></TouchableButton>
        <Image
          style={styles.smallcar}
          source={require("./../assets/smallcar.png")}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
const win = Dimensions.get("window");

const height = (win.width / 350) * 320;
const buttonHeight = win.height - 104;
const styles = StyleSheet.create({
  yellowvector: {
    width: win.width,
    height: height,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  smallcar: {
    width: 40,
    height: 20,
    position: "absolute",
    bottom: 16,
    right: 16,
  },
  buttonposition: {
    position: "absolute",
    top: buttonHeight,
  },
  default: {
    borderWidth: 1,
    borderColor: "#212121",
    padding: 16,
    borderRadius: 4,
    width: 328,
    height: 56,
    fontFamily: "Nunito-Light",
  },
  error: {
    color: "tomato",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16
  },
});
