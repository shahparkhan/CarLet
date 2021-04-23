import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const EditVehicle = ({ navigation }) => {
  const nameHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Vehicle Name",
      subheading: "Enter new vehicle name",
      placeholder: "Vehicle Name",
    });
  };
  const modelHandler = () => {};
  const typeHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Vehicle Type",
      subheading: "Enter new vehicle type",
      placeholder: "Vehicle Type",
    });
  };
  const rateHandler = () => {
    navigation.navigate("EditVehicleGeneral", {
      title: "Rental Rate",
      subheading: "Enter new per day rate",
      placeholder: "Rental Rate",
    });
  };
  const docsHandler = () => {
    navigation.navigate("EditVehicleDocs");
  };
  const picHandler = () => {
    navigation.navigate("EditVehiclePics");
  };

  return (
    <View style={styles.mainview}>
      <Text style={styles.heading}>{navigation.getParam("title")}</Text>

      <View style={styles.optionbox}>
        <TouchableOpacity onPress={() => nameHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Vehicle Name</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => modelHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Model</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => typeHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Type</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => rateHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Rental Rate</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => picHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Pictures</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => docsHandler()} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Documents</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    alignItems: "center",
  },
  heading: {
    position: "relative",
    marginTop: 36,
    width: 360,
    alignSelf: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: "center",
    marginBottom: 40,
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 15,
  },
  touch: {
    width: "100%",
    marginBottom: 15,
  },
  optionbox: {
    alignItems: "center",
    width: "70%",
  },
  card: {
    // borderColor: "lightgrey",
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderRadius: 3,
  },
});

export default EditVehicle;
