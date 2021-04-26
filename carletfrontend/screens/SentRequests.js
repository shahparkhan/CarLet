import React, { useState, useEffect } from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Card from "../assets/components/SentRequestCard";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SentRequests = ({navigation}) => {
  const [searchData, setSearchData] = useState([])
  // console.log("search data: ", searchData)

  useEffect(()=>{
    async function fetchData(){
      let mytoken = ''
        let myuuid = ''
        // useruuid

        try {
            mytoken = await AsyncStorage.getItem('@mytoken')
            myuuid = await AsyncStorage.getItem('@useruuid')
            console.log("token: ", mytoken)
            console.log("uuid: ", myuuid)
        
        } catch (error) {
            console.error('Failed to get token/uuid: ', error)
        }

        const sentrequestsdetails = JSON.stringify({
            user_id: myuuid
        })
        let responseJson
        try {
            let response = await fetch('http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/sentrentrequest/',{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${mytoken}`
            },
            body: sentrequestsdetails
            })
            responseJson = await response.json()
            console.log('server response: ', responseJson)
            if (responseJson['Success'] != undefined){
                setSearchData(responseJson['result'])
            } else if (responseJson['Error'] != undefined) {
            }
            

        } catch (error) {
            console.error('server error: ', error);
        }

    }
    fetchData()
        
  },[])

  const onPressHandler = async (title, rating, model, location, rate, pickupdate, dropoffdate, status, trip_id, cost) => {
      let mytoken
      try {
        mytoken = await AsyncStorage.getItem('@mytoken')
        console.log('got token: ', mytoken)
        
        if (status === "Approval Pending") {
          navigation.navigate('SentRequestsApproval', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        } 
        if (status === "Payment Pending"){
          navigation.navigate('SentRequestsPayment', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        }
        if (status === "Payment Done"){
          navigation.navigate('SentRequestsPayment2', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        }
        if (status === "In Progress"){
          navigation.navigate('SentRequestsInprogress', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        }
        if (status === "Dropoff Done"){
          navigation.navigate('SentRequestsDropoff', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        }
        if (status === "Trip Completed"){
          navigation.navigate('SentRequestsInprogress', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, trip_id: trip_id, token:mytoken, cost: cost}) 
        }
      } catch (e) {
        console.log("error: ", e)
      }
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.vehicle_name, item.rating, item.vehicle_model, item.vehicle_street_address, item.daily_rate, item.pickup_date, item.dropoff_date, item.status, item.trip_id, item.cost)}>
        <Card
          key={item.trip_id}
          title={item.vehicle_name}
          rating={item.rating}
          model={item.vehicle_model}
          location={item.vehicle_street_address}
          rate={item.daily_rate}
          status={item.status}
        />
      </TouchableOpacity>
    );
  };
  return(
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
              <Text style={{...styles.buttontext, color: "#ffa000" }}>SENT</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.button,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            onTouchStart={() => navigation.navigate('ReceivedRequests')}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>RECEIVED</Text>
            </TouchableOpacity>
          </View>
         
        </View>
        <View style={{height:32}}></View>
        <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.trip_id} style={{width:"100%"}}></FlatList>
    </View>
  )
};

const styles = StyleSheet.create({
  heading: {
    position: 'relative',
    width:360,
    marginTop: 32,
    alignSelf: 'center',
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: 'center'
  },
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
})

export default SentRequests;
// return <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.trip_id}></FlatList>;
