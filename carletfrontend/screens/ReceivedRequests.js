import { View } from "native-base";
import React, { useState, useEffect} from "react";
import { ScrollView } from "react-native";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import Card from "../assets/components/ReceivedRequestCard";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SentRequests = ({navigation}) => {

  const [searchData, setSearchData] = useState([])
  // console.log("search data: ", searchData)

  useEffect(()=>{
    async function fetchData(){
      let mytoken = ''
      let myuuid = ''

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
          let response = await fetch('http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/rcvrentrequest/',{
          method: 'post',
          mode: 'no-cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${mytoken}`
          },
          body: sentrequestsdetails
          })
          console.log("here: ")
          responseJson = await response.json()
          console.log("here2")
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
                borderBottomColor: "lightgrey",
                borderBottomWidth: 1,
              }}
              onTouchStart={() => navigation.navigate('SentRequests')}
            >
              <TouchableOpacity>
                <Text style={styles.buttontext}>SENT</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...styles.button,
                borderBottomColor: "#ffa000",
                borderBottomWidth: 1,
              }}
              
            >
              <TouchableOpacity>
                <Text style={{...styles.buttontext, color: "#ffa000" }}>RECEIVED</Text>
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

