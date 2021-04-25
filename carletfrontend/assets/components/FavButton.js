import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const TouchableButton = ({ buttonposition, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{...styles.touchableButton, ...buttonposition}}>
        <MaterialCommunityIcons name="cards-heart" size={24} color="#ffffff" style={{alignSelf:"center"}}/>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

  touchableButton: {
    borderRadius: 40,
    height: 40,
    backgroundColor: "#FFA000",
    width: 40,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    elevation: 5,
  }
});

export default TouchableButton;
