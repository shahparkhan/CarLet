import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import Slideshow from 'react-native-image-slider-show';

const Card = ({ imagesrc }) => {
  console.log(imagesrc);
  return (
    <View style={styles.shadow}>
      {/* <View style={styles.card}>
        <Image source={require("../Civic.png")} style={styles.image} />
      </View> */}

      <Slideshow 
      dataSource={imagesrc}/>
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
    height: 175,
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: 5,
    height: 175,
    marginTop: 0,
  },
  
});
