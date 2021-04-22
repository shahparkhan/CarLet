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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";

export default function Login({ navigation }) {
  const [email, setEmail] = React.useState(``);
  const [password, setPassword] = React.useState(``);
  const [borderColor, setborderColor] = useState(["black", "black"]);
  const [error, seterror] = useState(false);
  const [errorMsg, seterrorMsg] = useState("");
  const [focus, setFocus] = useState(false);

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

  const validateInput = async () => {
    console.log(email, password);
    if (anyfieldEmpty()) {
      seterror(true);
      seterrorMsg(`Some fields are empty`);

      let field1 = "black";
      let field2 = "black";

      if (email === "") {
        field1 = "red";
      }
      if (password === "") {
        field2 = "red";
      }

      setborderColor([field1, field2]);
      console.log("Some fields are empty");
    } else {
      // console.log("ALL GOOD!");

      // seterrorMsg("");
      // seterror(false);
      // setborderColor(["black", "black"]);

      console.log("ALl GOOD!");

      seterrorMsg("");
      seterror(false);
      setborderColor(["black", "black"]);

      const details = JSON.stringify({
        email: email,
        password: password,
      });

      try {
        let response = await fetch(
          "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/login/",
          {
            method: "post",
            mode: "no-cors",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: details,
          }
        );
        let responseJson = await response.json();
        console.log("server response: ", responseJson);

        if (responseJson["Error"] === "Username or password is incorrect") {
          seterrorMsg("Username or password is incorrect");
          seterror(true);
          // navigation.navigate("SignUp1", {email:email})
        } else {
          seterrorMsg("");
          seterror(false);
          setborderColor(["black", "black"]);

          const useruuid = responseJson.uuid;
          const mytoken = responseJson.token;

          try {
            await AsyncStorage.setItem("@isloggedin", "1");
            await AsyncStorage.setItem("@mytoken", responseJson.token);
            await AsyncStorage.setItem("@useruuid", responseJson.uuid);
          } catch (error) {
            console.log("AsyncStorage error: ", error);
          }
          try {
            const val = await AsyncStorage.getItem("@isloggedin");
            console.log("itemmm: ", val);
          } catch (error) {
            console.log("AsyncStorage error: ", error);
          }

          let registercheck = false;
          let verifiedcheck = false;

          try {
            response = await fetch(
              "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/checkregistration/",
              {
                method: "post",
                mode: "no-cors",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Token ${mytoken}`,
                },
                body: JSON.stringify({ user_id: useruuid }),
              }
            );
            responseJson = await response.json();
            console.log("server response: ", responseJson);

            if (responseJson.Success === "User has Registered") {
              try {
                await AsyncStorage.setItem("@isregistered", "1");
              } catch (e) {}

              registercheck = true;
            } else {
              try {
                await AsyncStorage.setItem("@isregistered", "0");
              } catch (e) {}
            }
          } catch (error) {}

          try {
            response = await fetch(
              "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/checkverification/",
              {
                method: "post",
                mode: "no-cors",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: `Token ${mytoken}`,
                },
                body: JSON.stringify({ user_id: useruuid }),
              }
            );
            responseJson = await response.json();
            console.log("server response: ", responseJson);

            if (responseJson.Success === "User is Verified") {
              try {
                await AsyncStorage.setItem("@isverified", "1");
              } catch (e) {}

              verifiedcheck = true;
            } else {
              try {
                await AsyncStorage.setItem("@isverified", "0");
              } catch (e) {}
            }
          } catch (error) {}

          if (registercheck) {
            if (verifiedcheck) {
              console.log("go home");
              navigation.navigate("Home");
            } else {
              navigation.navigate("Register6");
            }
          } else {
            navigation.navigate("Register");
          }
        }
      } catch (error) {
        console.error("server error1: ", error);
        seterrorMsg("Server error. Please try again");
        seterror(true);
      }
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}>
          <Image
            style={styles.yellowvector}
            source={require("./../assets/login.png")}
          />

          {error ? (
            <Text style={styles.error}>{errorMsg}</Text>
          ) : (
            <Text style={styles.error}></Text>
          )}

          <TextField
            style={{
              position: "relative",
              alignSelf: "center",
              borderColor: borderColor[0],
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
              borderColor: borderColor[1],
            }}
            placeholder="Password"
            changeHandler={passHandler}
            secureTextEntry={true}
            keyboardType={"default"}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text style={styles.forgotpassword}>Forgot Password?</Text>
          </TouchableOpacity>
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
    marginBottom: 16,
  },
  forgotpassword: {
    position: "relative",
    marginTop: 24,
    alignSelf: "center",
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    color: "#212121",
  },
});
