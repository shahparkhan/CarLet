import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TextInput } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpView from "./SignUpView";
import SignUpStyles from "./SignUpStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [borderColor, setborderColor] = useState(["black", "black"]);

  let l = "";

  

  

  const nameHandler = (e) => {
    setName(e);
  };

  const phonenumberHandler = (e) => {
    setPhonenumber(e);
  };

  const anyfieldEmpty = () => {
    if (name == "" || phonenumber == "") {
      return true;
    }
    return false;
  };

  const addCountryCode = () => {
    
  }

  const validateInput = () => {
    console.log(name, phonenumber);
    if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some Fields are Empty`);
      let field1 = "black"
      let field2 = "black"
      
      if (name === "") {
        field2 = "red"
      } 
      if (phonenumber === "") {
        field3 = "red"
      }
      setborderColor([field1, field2])
      console.log("Some fields are empty");
    } else if (phonenumber.length !== 11 ) {
      seterror(true);
      seterrorMsg(`Phone Number should be of 11 digits`);
      setborderColor(["black", "red"])
    } else {
      console.log("ALl GOOD!");
      console.log("phone number: ", phonenumber)
      let newphone = phonenumber
      newphone = newphone.replace("0","+92")
      console.log("newphone: ", newphone)

      setPhonenumber(newphone)
      
      console.log("updated phone number: ", phonenumber)
      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black"]);
      navigation.navigate("Register")
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
          placeholder={"Name"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[0],
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
            borderColor: borderColor[1],
            alignSelf: "center"
          }}
          changeHandler={phonenumberHandler}
          secureTextEntry={false}
          keyboardType={"numeric"}
        />
        <TouchableButton
        buttonposition={SignUpStyles.buttonposition}
        title="SIGNUP"
        onPress={validateInput}
      ></TouchableButton>
        </KeyboardAwareScrollView>
      
    </SignUpView>
  );
};

export default Signup;
