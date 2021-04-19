import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Platform,
  Keyboard,
  Dimension,
} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterVehicle1 = ({ naviagtion }) => {
  const [Name, setName] = useState("");
  const [Modelyear, setModelyear] = useState("");
  const [Type, setType] = useState("");

  const setVehicleName = (name) => {
    setName(name);
    console.log("name:", name);
  };
  const setModel = (model) => {
    setModelyear(model);
    console.log("model:", model);
  };
  const setVehicleType = (type) => {
    setType(type);
    console.log("Type:", type);
  };
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.mainHeading}>Register Vehicle</Text>
      <View style={styles.form}>
        <Text style={styles.heading}>Enter Name</Text>
        <TextField
          placeholder="Vehicle Name"
          changeHandler={setVehicleName}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
        <Text style={styles.heading}>Enter Model Year</Text>
        <TextField
          placeholder="Vehicle Name"
          changeHandler={setModel}
          style={{ marginTop: 10, marginBottom: 10 }}
        />
      </View>
    </View>
  );
};
const win = Dimensions.get("window");
const height = (win.width / 350) * 320;
const buttonHeight = win.height - 184;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  mainHeading: {
    fontFamily: "Nunito-Bold",
    color: "#212121",
    marginTop: 146,
    fontSize: 35,
    alignSelf: "center",
    marginTop: 30,
  },
  form: {
    // backgroundColor: "white",
    marginTop: 30,
    marginLeft: 18,
    marginRight: 35,
    width: "90%",
  },
  heading: {
    fontFamily: "Nunito-SemiBold",
    color: "#263238",
    fontSize: 24,
    marginLeft: 10,
  },
  textboxwithicon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#212121",
    height: 60,
    borderRadius: 4,
    margin: 10,
    width: "100%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  pickuptext: {
    borderColor: "white",
    marginLeft: 4,
    width: "90%",
  },
  calender: {
    marginRight: 2,
  },
  error: {
    color: "tomato",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16,
  },
  buttonposition: {
    alignSelf: "center",
    position: "absolute",
    top: buttonHeight,
  },
});

export default RegisterVehicle1;
