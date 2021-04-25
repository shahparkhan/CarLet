import { View } from "native-base";
import React from "react";
import { ScrollView } from "react-native";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import Card from "../assets/components/ReceivedRequestCard";
import RegisterStyles from "./RegisterStyles";


const SentRequests = ({navigation}) => {

  const searchData = navigation.getParam('result')
  console.log("search data: ", searchData)

  const onPressHandler = async (title, rating, model, fname, lname, pickupdate, dropoffdate, status, rate, trip_id) => {
      
      const requester = `${fname} ${lname}`
      
      if (status === "Approval Pending") {
        navigation.navigate('ReceivedRequestsApproval', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate, trip_id: trip_id}) 
      } 
      if (status === "Payment Pending"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate, trip_id: trip_id}) 
      }
      if (status === "Payment Done"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate, trip_id: trip_id}) 
      }
      if (status === "In Progress"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate, trip_id: trip_id}) 
      }
      if (status === "Dropoff Done"){
        navigation.navigate('ReceivedRequestsDropoff', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate, trip_id: trip_id}) 
      }
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.vehicle_name, item.rating, item.vehicle_model, item.first_name, item.last_name, item.pickup_date, item.dropoff_date, item.status, item.daily_rate, item.trip_id)}>
        <Card
          key={item.trip_id}
          title={item.vehicle_name}
          rating={item.rating}
          model={item.vehicle_model}
          requester={`${item.first_name} ${item.last_name}`}
          rate={item.daily_rate}
          status={item.status}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex:1}}>
      <Text style={styles.heading}>Received Requests</Text>
      <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.trip_id}></FlatList>
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

