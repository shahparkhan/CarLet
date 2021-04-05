import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpStyles from "./SignUpStyles";
import SignUpView from "./SignUpView";

const SignUp1 = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [borderColor, setborderColor] = useState("black");

  const nameHandler = (e) => {
    setName(e);
  };

  const phoneHandler = (e) => {
    setPhone(e);
  };

  const validateInput = () => {
    console.log("here");
    if (!isNumeric(Phone)) {
      seterror(true);
      seterrorMsg("Phone number must be numeric");
      setborderColor("tomato");
      console.log("Error");
    } else {
      console.log("good to go");
    }
  };

  const isNumeric = (num) => {
    console.log(typeof num);
    console.log(!isNaN("123456x"), !isNaN(num));
    return !isNaN(num);
  };

  return (
    <SignUpView>
      <ScrollView>
        {error ? <Text style={SignUpStyles.error}>{errorMsg}</Text> : <></>}
        <TextField
          placeholder={"Name"}
          style={{ position: "relative", marginTop: 20 }}
          changeHandler={nameHandler}
          secureTextEntry={false}
        />

        <TextField
          placeholder={"Phone"}
          style={{
            position: "relative",
            marginTop: 10,
            borderColor: borderColor,
          }}
          changeHandler={phoneHandler}
          secureTextEntry={false}
        />
      </ScrollView>

      <TouchableButton
        buttonposition={SignUpStyles.buttonposition}
        title="Next"
        onPress={validateInput}
      ></TouchableButton>
    </SignUpView>
  );
};

export default SignUp1;
