import React, { useState } from "react";
import { Image, Text} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpView from "./SignUpView";
import SignUpStyles from "./SignUpStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [borderColor, setborderColor] = useState(["black", "black", "black"]);

  let l = "";

  const validateEmailFromDataBase = (addr) => {
    const emailList = [
      "ashir1999@gmail.com",
      "adnan.abbas@lums.com", 
      "shahparnafeeskhan@gmail.com",
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
    
    if (anyfieldEmpty()) {
      
      seterror(true);
      seterrorMsg(`Some fields are empty`);
      
      let field1 = "black"
      let field2 = "black"
      let field3 = "black"
      
      if (email === ""){
        field1 = "red"
      } 
      if (Password === "") {
        field2 = "red"
      } 
      if (confirmPassword === "") {
        field3 = "red"
      }
      
      setborderColor([field1, field2, field3])
      console.log("Some fields are empty");

    } else if (Password != confirmPassword) {
      
      seterror(true);
      setborderColor(["black","red","red"]);
      seterrorMsg(`Passwords don't match`);

    } else if (!validateEmailFromDataBase(email)) {
      
      console.log("Invalidate Email");
      
      seterror(true);
      seterrorMsg("Invalid Email. Enter New Email");
      setborderColor(["red", "black", "black"]);

    } else {
      
      console.log("ALl GOOD!");
      
      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black", "black"]);
      navigation.navigate("SignUp1")

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
          placeholder={"Email"}
          style={{ 
            position: "relative", 
            borderColor: borderColor[0],
            alignSelf: "center" }}
          changeHandler={emailHandler}
          secureTextEntry={false}
          keyboardType={"email-address"}
        />

        <TextField
          placeholder={"Password"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[1],
            alignSelf: "center"
          }}
          changeHandler={passHandler}
          secureTextEntry={true}
          keyboardType={"default"}
        />

        <TextField
          placeholder={"Confirm Password"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[2],
            alignSelf: "center"
          }}
          changeHandler={re_enterHandler}
          secureTextEntry={true}
          keyboardType={"default"}
        />
        </KeyboardAwareScrollView>
      <TouchableButton
        buttonposition={SignUpStyles.buttonposition}
        title="NEXT"
        onPress={validateInput}
      ></TouchableButton>
    </SignUpView>
  );
};

export default Signup;
