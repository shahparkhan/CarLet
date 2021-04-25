import { View } from "native-base";
import React, { useState, useEffect} from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text } from "react-native";
import Card from "../assets/components/Card";
import AsyncStorage from '@react-native-async-storage/async-storage';


const FavVehicles = ({navigation}) => {
  const [searchData, setSearchData] = useState([])
  console.log("search data: ", searchData)

  useEffect(() => {
    async function fetchData(){
      let mytoken
      let myuuid
      try{
        mytoken = await AsyncStorage.getItem('@mytoken')
        myuuid = await AsyncStorage.getItem('@useruuid')
      } catch (e) {
        console.log('error: ', e)
      }
      try {
        response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/displayfav/${myuuid}/`,{
        method: 'get',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        })

        responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson['Success'] != undefined){
          setSearchData(responseJson['Success'])
        }
        
      } catch (error) {
          console.log("error: ", error)
      }
    }
    fetchData()
  }, [])

  const longPressHandler = async (fav_id) => {
    let mytoken
    try{
      mytoken = await AsyncStorage.getItem('@mytoken')
    } catch (e) {
      console.log('error: ', e)
    }
    try {
      response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/removefav/${fav_id}/`,{
      method: 'delete',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${mytoken}`
      },
      })

      responseJson = await response.json()
      console.log('server response: ', responseJson)
      
      if (responseJson['Success'] != undefined){
        setSearchData(responseJson['Success'])
      }
      
    } catch (error) {
        console.log("error: ", error)
    }



    let myuuid
    try{
      myuuid = await AsyncStorage.getItem('@useruuid')
    } catch (e) {
      console.log('error: ', e)
    }
    try {
      response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/displayfav/${myuuid}/`,{
      method: 'get',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${mytoken}`
      },
      })

      responseJson = await response.json()
      console.log('server response: ', responseJson)
      
      if (responseJson['Success'] != undefined){
        setSearchData(responseJson['Success'])
      }
      
    } catch (error) {
        console.log("error: ", error)
    }

  }
  
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity 
        onLongPress={() => longPressHandler(item.favorite_id)}
      >
        <Card
          key={item.favorite_id}
          title={item.vehicle_name}
          rating={item.vehicle_rating}
          model={item.vehicle_model}
          location={item.vehicle_address}
          rate={item.daily_rate}
          imagesrc={item.vehicle_picture1}
        />
      </TouchableOpacity>
    );
  };

  return(
      <View style={{flex:1}}>
          <Text style={styles.mainheading}>Favourite Vehicles</Text>
          <Text style={styles.subheading}>Long press the card to remove from it favourites</Text>
          <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.favorite_id}></FlatList>
      </View>
  ) 
};

const styles = StyleSheet.create({
    mainheading: {
        alignSelf:"center",
        fontFamily: "Nunito-Bold",
        fontSize: 34,
        marginTop: 32,
    },
    subheading: {
        alignSelf:"center",
        fontFamily: "Nunito-Regular",
        fontSize: 14,
        marginTop: 16,
        textAlign:"center"
    }
})

export default FavVehicles;
