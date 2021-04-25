import React, { useState, useEffect } from "react";
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions, Alert } from "react-native";
import Card from "../assets/components/Card";
import CarDetailsCard1 from "../assets/components/CarDetailsCard1";
import CarDetailsCard2 from "../assets/components/CarDetailsCard2";
import CarDetailsCard3 from "../assets/components/CarDetailsCard3";
import CarDetailsCard4 from "../assets/components/CarDetailsCard4";
import TouchableButton from "../assets/components/TouchableButton";
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const favHandler = async () => {
    let mytoken
    let myuuid
    try{
      mytoken = await AsyncStorage.getItem('@mytoken')
      myuuid = await AsyncStorage.getItem('@useruuid')
    } catch (e) {
      console.log('error: ', e)
    }
    const apiBody = JSON.stringify({
      user_id: myuuid,
      vehicle_id: navigation.getParam('vehicle_id')
    })

    try {
      response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/addfav/`,{
      method: 'post',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${mytoken}`
      },
      body: apiBody
      })

      responseJson = await response.json()
      console.log('server response: ', responseJson)
      
      if (responseJson['Success'] != undefined){
      }
      
    } catch (error) {
        console.log("error: ", error)
    }
  }

  const contactHandler = () => {
    Alert.alert(`You can call the owner on the following number: ${navigation.getParam('phone_number')}`)
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
          favHandler={favHandler}
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
      
      <View style={{alignSelf:"center", flexDirection:"row", justifyContent:"space-between", ...styles.buttonposition}}>
        <TouchableButton
          title="BOOK NOW"
          onPress={booknowHandler}>
        </TouchableButton>
        <TouchableButton
          title="CONTACT"
          buttonposition={{marginLeft:16}}
          onPress={contactHandler}
        >
        </TouchableButton>
      </View>
      
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
  