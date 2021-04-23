import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ title, model }) => {
  return (
    <View style={styles.shadow}>
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.model}>{model}</Text>
        </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  shadow: {
    width: "84%",
    elevation: 0,
    borderWidth:3,
    borderColor:"lightgrey",
    borderRadius: 4,
    marginTop: 50,
    alignSelf: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: 5,
    height: 175,
    marginTop: 0,
  },
  bottomText: {
    width: "100%",
    paddingLeft:8,
    paddingRight:8,
  },
  titleRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    justifyContent: "space-between",
    paddingLeft: 3,
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    color: "#212121",
    marginRight: 23,
    paddingLeft:8
  },
  model: {
    fontFamily: "Nunito-Regular",
    fontSize:16,
    alignSelf: "flex-start",
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 8,
  },

});