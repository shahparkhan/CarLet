import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TextInput } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpView from "./SignUpView";
import SignUpStyles from "./SignUpStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [borderColor, setborderColor] = useState(["black", "black", "black"]);

  let l = "";

  const validateUsernameFromDataBase = (addr) => {
    const usernameList = [
      "mistermaster",
      "thejuggler", 
      "jamesbond007"
    ];
    console.log("USERNAME:::", addr, usernameList.includes(addr));
    return usernameList.includes(addr);
  };

  const usernameHandler = (e) => {
    setUsername(e);
  };

  const nameHandler = (e) => {
    setName(e);
  };

  const phonenumberHandler = (e) => {
    setPhonenumber(e);
  };

  const anyfieldEmpty = () => {
    if (username == "" || name == "" || phonenumber == "") {
      return true;
    }
    return false;
  };
  const validateInput = () => {
    console.log(username, name, phonenumber);
    if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some fields are empty`);
      let field1 = "black"
      let field2 = "black"
      let field3 = "black"
      if (username === ""){
        field1 = "red"
      } 
      if (name === "") {
        field2 = "red"
      } 
      if (phonenumber === "") {
        field3 = "red"
      }
      setborderColor([field1, field2, field3])
      console.log("Some fields are empty");
    } else if (!validateUsernameFromDataBase(username)) {
      console.log("Invalidate Username");
      seterror(true);
      seterrorMsg("Invalid Username. Enter New Username");
      setborderColor(["red", "black", "black"])
    } else {
      console.log("ALl GOOD!");
      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black", "black"]);
    }
  };

  return (
    <SignUpView>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
        >

          <Image
            style={SignUpStyles.yellowvector}
            source={require("./../assets/SignupVector.png")}
          />
          
        {error ? <Text style={SignUpStyles.error}>{errorMsg}</Text> : <></>}
        
        <TextField
          placeholder={"Username"}
          style={{ 
            position: "relative", 
            alignSelf: "center",
            borderColor: borderColor[0],
            }}
          changeHandler={usernameHandler}
          secureTextEntry={false}
          keyboardType={"default"}
        />

        <TextField
          placeholder={"Name"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[1],
            alignSelf: "center"
          }}
          changeHandler={nameHandler}
          secureTextEntry={false}
          keyboardType={"default"}
        />

        <TextField
          placeholder={"Phone Number"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[2],
            alignSelf: "center"
          }}
          changeHandler={phonenumberHandler}
          secureTextEntry={false}
          keyboardType={"numeric"}
        />
        </KeyboardAwareScrollView>
      <TouchableButton
        buttonposition={SignUpStyles.buttonposition}
        title="SIGNUP"
        onPress={validateInput}
      ></TouchableButton>
    </SignUpView>
  );
};

export default Signup;
