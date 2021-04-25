import React from "react";
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native";
import Card from "../assets/components/SentRequestCard";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SentRequests = ({navigation}) => {
  const searchData = navigation.getParam('result')
  // console.log("search data: ", searchData)

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
    <View style={{flex:1}}>
      <Text style={styles.heading}>Sent Requests</Text>
      <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.trip_id} ></FlatList>
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
  }
})

export default SentRequests;
// return <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.trip_id}></FlatList>;
