import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TextInput } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpView from "./SignUpView";
import SignUpStyles from "./SignUpStyles";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [borderColor, setborderColor] = useState("black");

  let l = "";

  const validateEmailFromDataBase = (addr) => {
    const emailList = [
      "ashir1999@gmail.com",
      "adnan.abbas@lums.com, ShahparNafeesKhan@gmail.com",
    ];
    console.log("EMAIL:::", addr, emailList.includes(addr));
    return emailList.includes(addr);
  };
  const [enableshift, setEnableShift] = useState(false);
  const handleChange = (e) => {
    changeHandler(e);
  };

  const emailHandler = (e) => {
    setEmail(e);
  };

  const passHandler = (e) => {
    setPassword(e);
  };

  const re_enterHandler = (e) => {
    setconfirmPassword(e);
  };

  const anyfieldEmpty = () => {
    if (Password == "" || confirmPassword == "" || email == "") {
      return true;
    }
    return false;
  };
  const validateInput = () => {
    console.log(email, Password, confirmPassword);
    if (Password != confirmPassword) {
      // setpasswordsmatch(false);
      seterror(true);
      setborderColor("red");
      seterrorMsg(`Passwords don't match`);
    } else if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some fields are empty`);
      console.log("Some fields are empty");
    } else if (!validateEmailFromDataBase(email)) {
      console.log("Invalidate Email");
      seterror(true);
      seterrorMsg("Invalid Email. Enter new email");
    } else {
      console.log("ALl GOOD!");
      seterrorMsg("");
      seterror(false);
      setborderColor("black");
    }
  };

  return (
    <SignUpView>

      
        <KeyboardAvoidingView
          behavior="position"
        >

          <Image
            style={SignUpStyles.yellowvector}
            source={require("./../assets/SignupVector.png")}
          />
          
        {error ? <Text style={SignUpStyles.error}>{errorMsg}</Text> : <></>}
        
        <TextField
          placeholder={"Email"}
          style={{ position: "relative", alignSelf: "center" }}
          changeHandler={emailHandler}
          secureTextEntry={false}
        />

        <TextField
          placeholder={"Password"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor,
            alignSelf: "center"
          }}
          changeHandler={passHandler}
          secureTextEntry={true}
        />

        <TextField
          placeholder={"Confirm Password"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor,
            alignSelf: "center"
          }}
          changeHandler={re_enterHandler}
          secureTextEntry={true}
        />
        </KeyboardAvoidingView>

      <TouchableButton
        buttonposition={SignUpStyles.buttonposition}
        title="Next"
        onPress={validateInput}
      ></TouchableButton>
    </SignUpView>
  );
};

export default Signup;
