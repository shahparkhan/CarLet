import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const [borderColor, setborderColor] = useState("black")
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [promptMsg, setPromptMsg] = useState("Enter your email to reset your password")
  const [buttonPlaceholder, setButtonPlaceholder] = useState(true)

  const emailHandler = (e) => {
    setEmail(e);
  };

  const onPressHandler = () => navigation.navigate("Login")

  

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
    if (email === "") {
      seterror(true);
      seterrorMsg(`Email field is empty`);
      
      
      
      setborderColor("red")
      console.log("Email field is empty");

    } else {
      
      console.log("ALL GOOD!");
      setPromptMsg("A new password has been sent to you email")
      setButtonPlaceholder(false)
      seterrorMsg("");
      seterror(false);
      setborderColor("black");
      
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

          {error ? <Text style={styles.error}>{errorMsg}</Text> : <Text style={styles.prompt}>{promptMsg}</Text>}

          <TextField
            style={{ 
              position: "relative", 
              alignSelf: "center",
              borderColor: borderColor
            }}
            placeholder="Email"
            changeHandler={emailHandler}
            secureTextEntry={false}
            keyboardType={"email-address"}
          />

          
          
        </KeyboardAwareScrollView>
        
        {buttonPlaceholder ? 
            <TouchableButton
                buttonposition={styles.buttonposition}
                title="RESET"
                onPress={validateInput}
            ></TouchableButton> : 
            <TouchableButton
                buttonposition={styles.buttonposition}
                title="LOGIN"
                onPress={onPressHandler}
            ></TouchableButton>
        }

        
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
    top: win.height - 36,
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
  prompt: {
    color: "#212121",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16
  },
  forgotpassword: {
    position: "relative",
    marginTop: 24, 
    alignSelf:"center",
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    color:"#212121"
  },
});
