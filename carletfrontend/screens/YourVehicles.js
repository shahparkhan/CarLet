import React, { useState, useEffect } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Card from "../assets/components/YourVehicleCard";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
  

const searchData = [
    {
      key: "1",
      title: "Honda Civic",
      model: "2018",
    },
    {
      key: "2",
      title: "Honda Civic",
      model: "2020",
    },
    {
        key: "3",
        title: "Honda Civic",
        model: "2018",
      },
      {
        key: "4",
        title: "Honda Civic",
        model: "2020",
      },
      {
        key: "5",
        title: "Honda Civic",
        model: "2018",
      },
      {
        key: "6",
        title: "Honda Civic",
        model: "2020",
      },
      {
        key: "7",
        title: "Honda Civic",
        model: "2018",
      },
      {
        key: "8",
        title: "Honda Civic",
        model: "2020",
      },
]


const YourVehicles = ({navigation}) => {

  const onPressHandler = async (title,model) => {
    console.log(`as`)
    navigation.navigate ( 'EditVehicle',{title:title, model:model} )
  }

  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.title, item.model)}>
        <Card
          key={item.key}
          title={item.title}
          model = {item.model}
        />
      </TouchableOpacity>
    );
  };


  return (
    <View>
      <Text style={styles.heading}>
        Your Vehicles
      </Text>
    <FlatList data={searchData} renderItem={renderCard}></FlatList> 
    <Image
            style={styles.smallcar}
            source={require("./../assets/smallcar.png")}
    />
    
    </View>
  );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 186;
const smallcarheight = win.height - 116
const height = (win.width / 350) * 320;

const styles = StyleSheet.create({
  heading: {
    position: 'relative',
    marginTop: 36,
    width:360,
    alignSelf: 'center',
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: 'center'
},
smallcar : {
    width: 40,
    height: 20,
    position: "absolute",
    top: smallcarheight,
    right: 16,
},
})
  
export default YourVehicles;
