import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ title, rating, model, location, rate, imagesrc }) => {
  console.log(imagesrc);
  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
        <Image source={{uri:imagesrc}} style={styles.image} />
        <View style={styles.bottomText}>
          <View style={styles.titleRating}>
            <Text style={styles.title}>{title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontFamily: "Nunito-Bold",
                  fontSize: 20,
                }}
              >
                {rating}
              </Text>
              <MaterialIcons name="star" size={27} color="#FFC107" />
            </View>
          </View>
          <View>
            <Text style={styles.model}>{model}</Text>
          </View>
          <View style={styles.locationRate}>
            <Text style={styles.location}>{location}</Text>
            <Text style={styles.rate}>{`${rate}/day`}</Text>
          </View>
        </View>
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
    fontSize: 23,
    color: "#212121",
    marginRight: 23,
  },
  model: {
    fontFamily: "Nunito-Regular",
    alignSelf: "flex-start",
    flexDirection: "row",
    paddingBottom: 10,
    paddingLeft: 3,
  },
  locationRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#D8D8D8",
    borderTopWidth: 1,
    marginTop: 4,
    paddingTop: 4,
    alignItems: "center",
    paddingBottom: 20,
    paddingLeft: 3,
    paddingRight: 3,
  },
  location: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    color: "#212121",
    // paddingLeft: 3,
  },
  rate: {
    fontFamily: "Nunito-Light",
    color: "#212121",
  },
});
