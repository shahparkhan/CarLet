import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, Text, Image } from "react-native";
import { Rating } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

const Card = ({ location }) => {
  return (
    <View style={styles.shadow}>
      <View style={styles.card} >
       <ImageBackground source={require('../maps.png')} style={{flex:1}}>
        <View style={styles.firstView}>
            <Text style={styles.title}>Location</Text>

        </View>
        <View style={styles.secondView}>
        <Text style={styles.bioText}>{location}</Text>
            
        </View>
       </ImageBackground>
       
       
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
    height: 175,
    width: "100%",
    
  },
  image: {
    borderRadius: 60,
    height: 60,
    width:60,
    marginLeft: 8
  },
  firstView:{
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
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
    alignItems:"center"
  },
  ownerText:{
    fontFamily: "Nunito-Bold",
    fontSize: 20,
    color: "#212121",
    position:"relative",
    marginTop: 0,
    marginLeft: 18,
  },
  thirdView:{
    flex:1,
    flexDirection:"row",
    marginTop: 8
  },
  bioText:{
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
    justifyContent:"center"
  },
  
});
