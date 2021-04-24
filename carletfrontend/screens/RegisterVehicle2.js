import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import TextField from "../assets/components/TextField";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const RegisterVehicle2 = ({ navigation }) => {
  const [Rate, setRate] = useState("");
  const [Error, setError] = useState("");

  const setDailyRate = (r) => {
    setRate(r);
  };

  const checkDots = (decimal) => {
    let count = 0;
    for (let i = 0; i < decimal.length; i++) {
      if (decimal[i] == ".") {
        count++;
      }
    }
    return count > 1;
  };

  const validateInput = () => {
    if (Rate == "") {
      setError("Enter Rate");
    } else if (checkDots(Rate)) {
      setError("Invalid Rate");
    } else {
      setError("");
      let x = navigation.getParam("params");
      console.log(`params: ${JSON.stringify(x)} rate: ${Rate}`);
      navigation.navigate("RegisterVehicle3", {
        params: { ...x, rate: Rate },
      });
    }
  };

  return (
    <View style={styles.view}>

      <View>
        <Text style={styles.mainHeading}>Register Vehicle</Text>
        <Text style={styles.error}>{Error}</Text>
        <Text style={styles.heading}>Per Day Rate</Text>
        <TextField
          placeholder="Rental Rate"
          changeHandler={setDailyRate}
          style={styles.textstyle}
          keyboardType="decimal-pad"
        />

        <Text style={styles.heading}>Suggested Rate</Text>
        <Text style={styles.rate}>1200.00</Text>

        
      </View>
      <TouchableButton
          title="NEXT"
          buttonposition={styles.buttonposition}
          onPress={validateInput}
        />
      
    </View>
   
  );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 184;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    alignContent: "center",
  },
  mainHeading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    color: "#212121",
    marginTop: 36,
    marginBottom: 30,
    alignSelf: "center",
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
  textstyle: {
    marginTop: 16,
    marginBottom: 16,
  },
  rate: {
    marginLeft: 13,
    fontSize: 16,
    fontFamily: "Nunito-Regular",
    color: "#263238",
    marginTop: 16,
  },
  error: {
    alignSelf: "center",
    color: "tomato",
  },
});

export default RegisterVehicle2;
