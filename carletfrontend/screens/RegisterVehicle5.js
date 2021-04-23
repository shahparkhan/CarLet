import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Context from "../shared/context";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";
import ModalDropdown from "react-native-modal-dropdown";
// import FadeInOut from "react-native-fade-in-out";
//hello just for git
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RegisterVehicle5 = ({ navigation }) => {
  const { LocationState } = useContext(Context);
  const [House, setHouse] = useState("");
  const [Street, setStreet] = useState("");
  const [Area, setArea] = useState("");
  const [CityItems, setCityItems] = useState([
    "Karachi",
    "Lahore",
    "Islamabad",
  ]);
  const [City, setCity] = useState("");
  const [Error, setError] = useState("");

  const onSubmit = () => {
    const address = `${House} ${Street} ${Area}`;
    const city = City;

    if (House == "" || Street == "" || Area == "") {
      setError("Please fill all fields");
    } else {
      setError("");
      console.log(
        `address ${address} \n latitiude, longitude ${
          (LocationState.coords.latitude, LocationState.coords.longitude)
        }`
      );
    }
  };

  return (
    <View style={styles.mainview}>
      <Text style={styles.mainheading}>Register Vehicle</Text>
      <Text style={styles.error}>{Error}</Text>
      <TextField
        style={{ ...styles.textfieldstyle, marginTop: 50 }}
        placeholder="House"
        changeHandler={(e) => setHouse(e)}
      ></TextField>
      <TextField
        style={styles.textfieldstyle}
        placeholder="Street"
        changeHandler={(e) => setHouse(e)}
      ></TextField>
      <TextField
        style={styles.textfieldstyle}
        placeholder="Area"
        changeHandler={(e) => setHouse(e)}
      ></TextField>
      <View style={{ width: "100%" }}>
        <ModalDropdown
          options={CityItems}
          style={styles.style}
          animated={true}
          dropdownstyle={styles.dropdown}
          dropdownTextStyle={{ fontFamily: "Nunito-Regular", fontSize: 14 }}
          isFullWidth={true}
          textStyle={styles.textStyle}
          onSelect={(index) => {
            setCity(CityItems[index]);
          }}
        >
          <Text style={styles.citytext}>Select City</Text>
          <MaterialCommunityIcons
            name="menu-down"
            size={24}
            color="black"
            style={styles.icon}
          />
        </ModalDropdown>
      </View>
      <TouchableButton
        title="SUBMIT"
        onPress={onSubmit}
        buttonposition={styles.buttonposition}
      ></TouchableButton>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  mainheading: {
    fontFamily: "Nunito-Bold",
    marginTop: 36,
  },
  textfieldstyle: {
    marginTop: 10,
    marginBottom: 20,
  },
  style: {
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 4,
    height: 56,
    justifyContent: "center",
    marginTop: 10,
    alignContent: "center",
  },
  dropdown: {
    marginTop: -10,
    width: "100%",
    borderRadius: 4,
    borderColor: "#212121",
    borderWidth: 1,
  },
  textStyle: {
    marginLeft: 16,
    fontFamily: "Nunito-Regular",
    fontSize: 15,
    color: "#212121",
    paddingTop: 100,
  },
  buttonposition: {
    marginTop: 60,
  },
  icon: {
    alignSelf: "flex-end",
  },
  citytext: {
    fontFamily: "Nunito-Light",
    color: "grey",
    paddingLeft: 16,
  },
  error: {
    alignSelf: "center",
    color: "tomato",
    fontFamily: "Nunito-Light",
  },
});

export default RegisterVehicle5;
