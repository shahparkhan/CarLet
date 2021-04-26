import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Context from "../shared/context";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";
import ModalDropdown from "react-native-modal-dropdown";
// import FadeInOut from "react-native-fade-in-out";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [City, setCity] = useState("Select City");
  const [Error, setError] = useState("");

  const onSubmit = async () => {
    const address = `${House} ${Street} ${Area} ${City}`;
    const city = City;

    if (House == "" || Street == "" || Area == "" || City == "Select City") {
      setError("Please fill all fields");
    } else {
      setError("");
      console.log(
        `address ${address} \n latitiude ${LocationState.coords.latitude}, longitude ${LocationState.coords.longitude}`
      );

      let myuuid
      let mytoken
      try {
        myuuid = await AsyncStorage.getItem('@useruuid')
        mytoken = await AsyncStorage.getItem('@mytoken')
      } catch (e) {
        console.log("error: ", e)
      }
      
      const apiBody = JSON.stringify({
        user_id: myuuid,
        vehicle_name: navigation.getParam('params')['name'],
        vehicle_model: navigation.getParam('params')['year'],
        vehicle_type: navigation.getParam('params')['type'],
        daily_rate: navigation.getParam('params')['rate'],
        license_plate: navigation.getParam('params')['licenseplate'],
        city: City,
        latitude: LocationState.coords.latitude,
        longitude: LocationState.coords.longitude,
        street_address: address,
        ...navigation.getParam('params')['vehicle_pictures'],
        reg_papers: navigation.getParam('params')['registration'],
        insurance_papers: navigation.getParam('params')['insurance'],
        tracker_papers: navigation.getParam('params')['tracker'],
      })

      const apiLink = 'http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/registervehicle/'
      

      try {
      
        response = await fetch(apiLink,{
        method: 'post',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        body: apiBody
        })
        responseJson = await response.json()
        console.log('server response: ', responseJson)
        if (responseJson['Success'] != undefined){
          navigation.navigate('SuccessPrompt', {title: "Vehicle Registration", body: "Your vehicle has been registered successfully! We will soon verify your vehicle."})
        } else {
          navigation.navigate('ErrorPrompt', {title: "Vehicle Registration", body: "There was an error while registering your vehicle. Please try again later."})
        }
  
      } catch (error) {
        console.log("server error: ", error)
        navigation.navigate('ErrorPrompt', {title: "Vehicle Registration", body: "There was an error while registering your vehicle. Please try again later."})
      }

    }
  };

  return (
    <ScrollView>
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
        changeHandler={(e) => setStreet(e)}
      ></TextField>
      <TextField
        style={styles.textfieldstyle}
        placeholder="Area"
        changeHandler={(e) => setArea(e)}
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
          <View style={{flexDirection:"row", justifyContent:"space-between"}}>
          <Text style={styles.citytext}>{City}</Text>
          <MaterialCommunityIcons
            name="menu-down"
            size={24}
            color="black"
            style={styles.icon}
          />
          </View>
        </ModalDropdown>
      </View>
      <TouchableButton
        title="SUBMIT"
        onPress={onSubmit}
        buttonposition={styles.buttonposition}
      ></TouchableButton>
      
    </View>
    </ScrollView>
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
    fontSize: 34,
    color: "#212121",
  },
  textfieldstyle: {
    marginBottom:16,
  },
  style: {
    borderColor: "#212121",
    borderWidth: 1,
    borderRadius: 4,
    height: 56,
    justifyContent: "center",
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
    marginRight:16
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
    marginTop: 16
  },
});

export default RegisterVehicle5;
