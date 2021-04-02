import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const TouchableButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.touchableButton}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableButton: {
    borderRadius: 40,
    height: 48,
    backgroundColor: "#455A64",
    width: 125,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 5,
  },
  text: {
    // fontFamily: ,
    fontSize: 14,
    color: "white",
  },
});

export default TouchableButton;
