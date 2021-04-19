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
          ownerImage={navigation.getParam('imagesrc')[2]}
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
        onPress={()=>console.log("BOOK NOW pressed")}>

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
  