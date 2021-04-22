import { View, Image, Dimensions, StyleSheet, Text } from "react-native";
import React from "react";

const RegisterVehicle4 = () => {
  return (
    <View>
      <Image
        style={styles.yellowvector}
        source={require("./../assets/YellowVectorGreenTick.png")}
      />
      <View style={styles.textstyle}>
        <Text style={styles.heading}>Register Vehicle</Text>
        <View style={styles.smalltextstyle}>
          <Text style={styles.smalltext}>
            We have received your registration
          </Text>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.smalltext}>
              information. We will get back to
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.smalltext}>you shortly!</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const win = Dimensions.get("window");

const height = (win.width / 350) * 320;
const styles = StyleSheet.create({
  yellowvector: {
    width: win.width,
    height: height,
    marginTop: -50,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    color: "#212121",
  },
  smalltext: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: "#263238",
  },
  textstyle: {
    alignContent: "center",
    alignItems: "center",
  },
  smalltextstyle: {
    marginTop: 10,
    width: "80%",
  },
});

export default RegisterVehicle4;
