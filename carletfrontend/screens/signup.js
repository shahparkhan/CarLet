import React from "react";
import { View, Image, StyleSheet } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";

export default function Signup() {
  return (
    <View style={styles.viewContainer}>
      <Image source={require("./../assets/SignupVector.png")} />
      <TouchableButton
        title="Next"
        onPress={() => {
          console.log("Pressed");
        }}
      ></TouchableButton>

      {/* <TouchableButton
        title="Sign In"
        onPress={() => {
          console.log("Pressed");
        }}
      ></TouchableButton> */}
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
