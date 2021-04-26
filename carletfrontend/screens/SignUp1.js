import React, { useState } from "react";
import { View, Image, KeyboardAvoidingView, ScrollView, Text, TextInput } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import SignUpView from "./SignUpView";
import SignUpStyles from "./SignUpStyles";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ScrollPager } from "react-native-tab-view";

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

  const validateInput = async () => {
    console.log(name, phonenumber);
    if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some Fields are Empty`);
      let field1 = "black"
      let field2 = "black"
      
      if (name === "") {
        field1 = "red"
      } 
      if (phonenumber === "") {
        field2 = "red"
      }
      setborderColor([field1, field2])
      console.log("Some fields are empty");
    } else if (phonenumber[0] != "+" || phonenumber[1] != "9" || phonenumber[2] != "2") {
      seterror(true)
      seterrorMsg("Please fill the phone number field with +92 country code")
      setborderColor(["black", "red"])
    } else if (phonenumber.length !== 13 ) {
      seterror(true);
      seterrorMsg(`Incorrect length of phone number`);
      setborderColor(["black", "red"])
    } else {
      

      console.log("ALl GOOD!");
      
      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black", "black"]);
      
      let namearr = name.split(" ")
      const Fname = namearr[0]
      const Lname = namearr.slice(1, namearr.length).join(" ")

      // let phonedigits = phonenumber.split("")
      // const phonewithcode = "+92" + phonedigits.slice(1,phonedigits.length).join("")

      console.log("email: ", navigation.getParam('email'))
      
      const details = JSON.stringify({
        email: navigation.getParam('email'),
        first_name: Fname,
        last_name: Lname,
        phone_number:phonenumber
      })

      try {
        let response = await fetch('http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/signup2/',{
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: details
        })
        let responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson.phone_number === "An account with this phone number already exists"){
          seterrorMsg("An account with this phone number already exists");
          seterror(true);
        } else {
          navigation.navigate("Welcome")
        }

      } catch (error) {
        console.error('server error: ', error);
        seterrorMsg("Server error. Please try again");
        seterror(true);
      }
    }
  };

  return (
    <SignUpView>

        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
        >
        <ScrollView>
          <Image
            style={SignUpStyles.yellowvector}
            source={require("./../assets/SignupVector.png")}
          />
          
          
        {error ? <Text style={SignUpStyles.error}>{errorMsg}</Text> : <Text style={SignUpStyles.error}></Text>}
        
        

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
          placeholder={"Example: +923331234123"}
          style={{
            position: "relative",
            marginTop: 16,
            borderColor: borderColor[1],
            alignSelf: "center"
          }}
          changeHandler={phonenumberHandler}
          secureTextEntry={false}
          keyboardType={"phone-pad"}
        />
        </ScrollView>
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
