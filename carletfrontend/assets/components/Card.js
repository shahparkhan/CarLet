import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ title, rating, model, location, rate, imagesrc, pickupdate, dropoffdate }) => {
  return (
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
          <View>
            {pickupdate ? <Text style={styles.model}>Pickup date: {pickupdate}</Text> : <></>}   
          </View>
          <View>
          {dropoffdate ? <Text style={styles.model}>Dropoff date: {dropoffdate}</Text> : <></>} 
          </View>
        </View>
        
      </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  
  card: {
    flex:1,
    width: "90%",
    borderWidth:3,
    borderColor:"lightgrey",
    borderRadius: 4,
    justifyContent:"flex-start",
    margin: 16,
    alignSelf:"center"
    
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
    flex:1,
  },
  titleRating: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 23,
    color: "#212121",
    marginRight: 23,
    marginLeft:8
  },
  model: {
    fontFamily: "Nunito-Regular",
    alignSelf: "flex-start",
    flexDirection: "row",
    marginBottom: 8,
    marginLeft: 8,
  },
  locationRate: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: "#D8D8D8",
    borderTopWidth: 1,
    marginTop: 4,
    paddingTop: 4,
    alignItems: "center",
    paddingRight: 3,
    marginBottom:8
  },
  location: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    color: "#212121",
    marginLeft: 8,
    width:"70%",
    justifyContent:"flex-start",

  },
  rate: {
    fontFamily: "Nunito-Light",
    color: "#212121",
    
    
  },
  pickupdate: {
    fontFamily: "Nunito-Regular",
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    marginLeft: 8,
  }
});
