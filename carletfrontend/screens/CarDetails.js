import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Card from "../assets/components/Card";
import CarDetailsCard1 from "../assets/components/CarDetailsCard1";
import CarDetailsCard2 from "../assets/components/CarDetailsCard2";
import CarDetailsCard3 from "../assets/components/CarDetailsCard3";
import CarDetailsCard4 from "../assets/components/CarDetailsCard4";
import TouchableButton from "../assets/components/TouchableButton";

const searchData = [
    {
      key: "1",
      title: "Honda Civic",
      model: "2018",
      rating: 5,
      location: "DHA PHASE 8",
      rate: 1500,
      imagesrc: "none",
    },
   
  ];

  
  
  
const CarDetails = ({navigation}) => {

  const booknowHandler = () => {
    const apiBody = JSON.stringify({
      user_id: navigation.getParam('uuid'),
      vehicle_id: navigation.getParam('vehicle_id'),
      pickup_date: navigation.getParam('pickup'),
      dropoff_date: navigation.getParam('dropoff'),
      duration: navigation.getParam('duration'),
      cost: navigation.getParam('cost'),
    })

    // console.log({title:"Book Now", successBody:"The vehicle has been successfully booked!", errorBody: "There was some error while booking the vehicle. Please try again later.", apiLink: "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/requestvehicle/", apiBody:apiBody, token: navigation.getParam('token')})

    navigation.navigate("CautionPrompt", {title:"Book Now", successBody:"The vehicle has been successfully booked!", errorBody: "There was some error while booking the vehicle. Please try again later.", apiLink: "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/requestvehicle/", apiBody:apiBody, token: navigation.getParam('token')})
  }

  const renderCard = ({ item, index, separators }) => {
    console.log("image list", navigation.getParam('imagesrc'))
    return (
      <View>
        <CarDetailsCard1
          
          imagesrc={navigation.getParam('imagesrc')}
        />
        <CarDetailsCard2
          
          title={navigation.getParam('title')}
          rating={navigation.getParam('rating')}
          model={navigation.getParam('model')}
          location={navigation.getParam('location')}
          rate={navigation.getParam('rate')}
        />
        <CarDetailsCard3
          
          owner={navigation.getParam('owner')}
          bio={navigation.getParam('bio')}
          ownerImage={navigation.getParam('owner_picture')}
        />
        <CarDetailsCard4
          
          location={navigation.getParam('location')}
        />
        <View style={{height: 200}}></View>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={searchData} renderItem={renderCard}></FlatList>
      <TouchableButton
        buttonposition={styles.buttonposition}
        title="BOOK NOW"
        onPress={booknowHandler}>

      </TouchableButton>
    </View>
  );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 186;
const height = (win.width / 350) * 320;

const styles = StyleSheet.create({
  buttonposition:{
    position: "absolute",
    top: buttonHeight,
  }
})
  
export default CarDetails;
  