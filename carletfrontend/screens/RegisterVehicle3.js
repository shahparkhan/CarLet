import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import * as ImagePicker from "expo-image-picker";

const RegisterVehicle3 = ({ navigation }) => {
  const [RegistrationPDF, setRegistrationPDF] = useState("");
  const [InsurancePDF, setInsurancePDF] = useState("");
  const [TrackerPDF, setTrackerPDF] = useState("");

  const [RegistrationMsg, setRegistrationMsg] = useState("");
  const [InsuranceMsg, setInsuranceMsg] = useState("");
  const [TrackerMsg, setTrackerMsg] = useState("");

  const [Error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS !== "web") {
        try {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== `granted`) {
            alert("Permission denied!");
          }
        } catch (error) {}
      }
    }
    fetchData();
  }, []);

  const pickImageRegistration = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // console.log(result)
      if (!result.cancelled) {
        setRegistrationPDF(`data:image/jpeg;base64,${result.base64}`);
        setRegistrationMsg("Image uploaded");
      }
    } catch (error) {
      console.log("bc", error);
    }
  };

  const pickImageInsurance = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // console.log(result)
      if (!result.cancelled) {
        setInsurancePDF(`data:image/jpeg;base64,${result.base64}`);
        setInsuranceMsg("Image uploaded");
      }
    } catch (error) {
      console.log("bc", error);
    }
  };

  const pickImagetracker = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // console.log(result)
      if (!result.cancelled) {
        setTrackerPDF(`data:image/jpeg;base64,${result.base64}`);
        setTrackerMsg("Image uploaded");
      }
    } catch (error) {
      console.log("bc", error);
    }
  };

  const validateAndSubmit = () => {
    if (RegistrationPDF == "" || InsurancePDF == "" || TrackerPDF == "") {
      setError("Please upload all documents");
    } else {
      const data = navigation.getParam("params");
      console.log(`data ${data}`);
      navigation.navigate("RegisterVehicle4", {
        params: {
          registration: RegistrationPDF,
          insurance: InsurancePDF,
          tracker: TrackerPDF,
          ...data,
        },
      });
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.subview}>
        <Text style={styles.mainHeading}>Register Vehicle</Text>
        <Text style={styles.error}>{Error}</Text>
        <Text style={styles.heading}>Documents</Text>

        <View style={styles.uploadView}>
          <Text style={styles.text}>Registration pdf</Text>
          <TouchableButton
            title="UPLOAD"
            onPress={pickImageRegistration}
          ></TouchableButton>
        </View>
        <View style={styles.uploadmsg}>
          <Text style={styles.greenText}>{RegistrationMsg}</Text>
        </View>
        <View style={styles.uploadView}>
          <Text style={styles.text}>Insurance pdf</Text>
          <TouchableButton
            title="UPLOAD"
            onPress={pickImageInsurance}
          ></TouchableButton>
        </View>
        <View style={styles.uploadmsg}>
          <Text style={styles.greenText}>{InsuranceMsg}</Text>
        </View>
        <View style={styles.uploadView}>
          <Text style={styles.text}>Tracker pdf</Text>
          <TouchableButton
            title="UPLOAD"
            onPress={pickImagetracker}
          ></TouchableButton>
        </View>
        <View style={styles.uploadmsg}>
          <Text style={styles.greenText}>{TrackerMsg}</Text>
        </View>

        <TouchableButton
          title="NEXT"
          buttonposition={styles.buttonposition}
          onPress={validateAndSubmit}
        />
      </View>
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
  subview: {
    width: "90%",
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
    marginBottom: 20,
  },
  buttonposition: {
    alignSelf: "center",
    position: "absolute",
    top: buttonHeight,
  },
  uploadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 10,
  },
  error: {
    alignSelf: "center",
    color: "tomato",
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
  },
  uploadmsg: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 20,
    marginTop: -10,
    marginBottom: 5,
  },
  greenText: {
    fontFamily: "Nunito-Regular",
    color: "green",
  },
});

export default RegisterVehicle3;
