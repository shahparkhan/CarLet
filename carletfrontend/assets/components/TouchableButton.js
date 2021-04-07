import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const TouchableButton = ({ buttonposition, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.touchableButton, ...buttonposition}}>
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
    alignSelf: "center",
    justifyContent: "center",
    elevation: 5,
  },
  text: {
    // fontFamily: ,
    fontSize: 14,
    color: "white",
  },
});

export default TouchableButton;
