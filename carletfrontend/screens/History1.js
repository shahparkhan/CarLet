import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Card from "../assets/components/Card";


const History1 = ({ navigation }) => {
  const [history, setHistory] = useState([])

  useEffect(()=>{
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
        response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/triphistory/${myuuid}/`,{
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
        
        if (responseJson['by_you'] != undefined){
          setHistory(responseJson['by_you'])
        }
        
      } catch (error) {
          console.log("error: ", error)
      }
    }
    fetchData()
        
  },[])

  const renderCard = ({ item, index, separators }) => {
    return ( 
      <Card
        key={item.vehicle_id}
        title={item.vehicle_name}
        rating={item.vehicle_rating}
        model={item.vehicle_model}
        location={item.vehicle_address}
        rate={item.daily_rate}
        imagesrc={item.vehicle_picture1}
        pickupdate={item.pickup_date}
        dropoffdate={item.dropoff_date}
      />
    )
  }

    

  return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex:1
        }}
      >
        <View style={styles.topbar}>
          <View
            style={{
              ...styles.button,
              borderBottomColor: "#ffa000",
              borderBottomWidth: 1,
            }}
            
          >
            <TouchableOpacity>
              <Text style={{...styles.buttontext, color: "#ffa000" }}>AS RENTER</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.button,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            onTouchStart={() => navigation.navigate('History2')}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>AS OWNER</Text>
            </TouchableOpacity>
          </View>
         

          
        </View>

        <View style={{height:32}}></View>
        
        <FlatList data={history} renderItem={renderCard} keyExtractor={item => item.vehicle_id} style={{width:"100%"}}></FlatList>
        
        
      </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
  },
  mainheading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    marginTop: 10,
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "lightgrey",
    width: "100%",
    marginTop: 26,
    justifyContent:"flex-start"
  },
  
  
  amount: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    color: 'black',
    fontFamily:"Nunito-Light",
    justifyContent:"flex-start"
  },
  receipt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    margin: 16,
    alignSelf: "center",
  },
  upload: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    alignSelf: "center",
    margin: 16,
    marginTop: 32
  },
  walletstyle:{
    flexDirection:"row",
    justifyContent:"flex-start",
    marginBottom: 16,
    alignItems:"center",
  },
  walletImage:{
      height:24,
      width:24,
      marginLeft:16,
      marginTop: 8,
      justifyContent:"flex-start"
  },
  balance: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    
  },
  uploadmsg: {
    flexDirection: "row",
    
    
  },
  greenText: {
    fontFamily: "Nunito-Regular",
    color: "green",
  },
});
export default History1;
