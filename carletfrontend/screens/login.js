import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";

export default function Login() {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const [enableshift, setEnableShift] = React.useState(false);

  const changeHandler = (val) => {
    setEmail(val);
  };
  const changeHandlerPassword = (val) => {
    setPassword(val);
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.yellowvector}
        source={require("./../assets/login.png")}
      />
      <ScrollView contentContainerStyle={{ justifyContent: "center" }}>
        <TextField
          style={{ position: "relative", marginTop: 50 }}
          placeholder="Email"
          changeHandler={changeHandler}
          secureTextEntry={false}
        />

        <TextField
          style={{ position: "relative", marginTop: 50 }}
          placeholder="Password"
          changeHandler={changeHandler}
          secureTextEntry={true}
        />
      </ScrollView>
      {/* <KeyboardAvoidingView 
                            behavior = "position"
                            enabled={enableshift}
                        >
                            <TextInput style = {{...styles.default,...{position:"relative",top:-50}}} placeholder = 'Email' onChangeText = { changeHandler } onFocus={() => setEnableShift(true)}/> 
                            <TextInput secureTextEntry={true} style = {{...styles.default,...{position:"relative",top:-34}}} placeholder = 'Password' onChangeText = { changeHandlerPassword } onFocus={() => setEnableShift(true)}/> 
                        
                    </KeyboardAvoidingView> */}

      <TouchableButton
        buttonposition={styles.buttonposition}
        title="LOGIN"
        onPress={() => {
          console.log(password);
        }}
      ></TouchableButton>
      <Image
        style={styles.smallcar}
        source={require("./../assets/smallcar.png")}
      />
    </View>
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
});
