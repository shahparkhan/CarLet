import React, { useState } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ title, rating, model, requester, rate, pickupdate, dropoffdate, status }) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.card}>
       <View style={styles.firstView}>
         <Text style={styles.title}>{title}</Text>
         
       </View>
       <View style={styles.secondView}>
        <Text style={styles.modelText}>{model} </Text>
       </View>
       <View style={styles.thirdView}>
           <Text style={styles.title}>Requested By</Text>
           
       </View>
       <View style={styles.secondView}>
        <Text style={styles.modelText}>{requester}</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{rating} </Text>
          <MaterialIcons name="star" size={24} color="#FFC107" style={styles.ratingStar}/>
         </View>
       </View>
       <View style={styles.thirdView}>
           <Text style={styles.title}>Pickup</Text>
           <Text style={{...styles.title, marginRight:8}}>Dropoff</Text>
       </View>
       <View style={{...styles.secondView, justifyContent:"space-between"}}>
        <Text style={styles.modelText}>{pickupdate}</Text>
        <Text style={{...styles.modelText, marginRight:8}}>{dropoffdate}</Text>
       </View>
       <View style={styles.thirdView}>
           <Text style={styles.title}>Rate</Text>
       </View>
       <View style={styles.secondView}>
        <Text style={styles.modelText}>{rate}/day</Text>
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
    height: 350,
    width: "100%",
  },
  image: {
    width: "100%",
    borderRadius: 5,
    height: 175,
    marginTop: 0,
  },
  firstView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    color: "#212121",
    position:"relative",
    marginLeft: 8,
    marginTop: 8,
  },
  rating:{
    flexDirection:"row",
    alignItems:"center"
  },
  ratingText:{
    fontFamily: "Nunito-Regular",
    fontSize: 20,
    color: "#212121",
    position:"relative",
    marginTop: 8,
  },
  ratingStar:{   
    position:"relative",
    marginRight: 8,
    marginTop: 8,
  },
  secondView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  modelText:{
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
    position:"relative",
    marginTop: 8,
    marginLeft: 8,
  },
  thirdView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    borderTopColor: "#D8D8D8",
    borderTopWidth: 1,
    borderRadius: 16
  },
  requester:{
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
    position:"relative",
    marginTop: 8,
    marginLeft: 8,
  },
  rate:{
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
    position:"relative",
    marginTop: 8,
    marginRight: 8,
  },
  fourthView:{
    flex:1,
    flexDirection:"row",
    marginLeft: 8,
    borderTopColor: "#D8D8D8",
    borderTopWidth: 1,
  },
  
});
