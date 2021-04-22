import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import ModalDropdown from "react-native-modal-dropdown";

const RegisterVehicle1 = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Modelyear, setModelyear] = useState("");
  const [Type, setType] = useState("");
  const [Error, setError] = useState("");
  const [TypeItems, setTypeItems] = useState([
    "Car",
    "Bike",
    "Pick-up",
    "Cycle",
    "Car",
    "Bike",
    "Pick-up",
    "Cycle",
  ]);

  const setVehicleType = (index) => {
    setType(TypeItems[index]);
  };

  const setVehicleName = (name) => {
    setName(name);
    console.log("name:", name);
  };
  const setModel = (model) => {
    setModelyear(model);
    console.log("model:", model);
  };

  const validateInput = () => {
    if (Name == "" || Modelyear == "" || Type == "") {
      setError("Please fill all fields");
    } else if (Modelyear.length > 4) {
      setError("Invalid year");
    } else {
      setError("");
      navigation.navigate("RegisterVehicle2", {
        params: { name: Name, year: Modelyear, type: Type },
      });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.view}>
        <Text style={styles.mainHeading}>Register Vehicle</Text>
        <View style={styles.form}>
          <Text style={styles.error}>{Error}</Text>
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
            keyboardType="number-pad"
          />
          <Text style={styles.heading}>Select Vehicle Type</Text>
          <ModalDropdown
            options={TypeItems}
            style={styles.style}
            animated={true}
            dropdownstyle={styles.dropdown}
            dropdownTextStyle={{ fontFamily: "Nunito-Regular", fontSize: 14 }}
            isFullWidth={true}
            textStyle={styles.textStyle}
            onSelect={setVehicleType}
          ></ModalDropdown>
        </View>
        <TouchableButton
          buttonposition={styles.buttonposition}
          onPress={validateInput}
          title="NEXT"
        ></TouchableButton>
      </View>
    </TouchableWithoutFeedback>
  );
};
const win = Dimensions.get("window");
const buttonHeight = win.height - 184;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    alignContent: "center",
  },
  mainHeading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    color: "#212121",
    marginTop: 36,
    marginBottom: 30,
  },
  heading: {
    fontFamily: "Nunito-SemiBold",
    color: "#263238",
    fontSize: 24,
    marginLeft: 10,
  },
  buttonposition: {
    alignSelf: "center",
    position: "absolute",
    top: buttonHeight,
  },
  error: {
    alignSelf: "center",
    color: "tomato",
  },
  style: {
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 4,
    height: 56,
    justifyContent: "center",
    marginTop: 10,
  },
  dropdown: {
    marginTop: -10,
    width: "100%",
    backgroundColor: "green",
    borderRadius: 4,
    borderColor: "#212121",
    borderWidth: 1,
  },
  textStyle: {
    marginLeft: 16,
    fontFamily: "Nunito-Regular",
    fontSize: 15,
    color: "#212121",
  },
});

export default RegisterVehicle1;
