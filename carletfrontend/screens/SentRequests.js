import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import Card from "../assets/components/SentRequestCard";

const searchData = [
  {
    key: "1",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Dropoff Done"
    
  },
  {
    key: "2",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Approval Pending"
  },
  {
    key: "3",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "In Progress"
  },
  {
    key: "4",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Payment Pending"
  },
  {
    key: "5",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Payment Done"
  },
];

const SentRequests = ({navigation}) => {
  const onPressHandler = async (title, rating, model, location, rate, pickupdate, dropoffdate, status) => {
      if (status === "Approval Pending") {
        navigation.navigate('SentRequestsApproval', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status}) 
      } 
      if (status === "Payment Pending"){
        navigation.navigate('SentRequestsPayment', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status}) 
      }
      if (status === "Payment Done"){
        navigation.navigate('SentRequestsPayment2', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status}) 
      }
      if (status === "In Progress"){
        navigation.navigate('SentRequestsInprogress', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status}) 
      }
      if (status === "Dropoff Done"){
        navigation.navigate('SentRequestsDropoff', {title: title, rating: rating, model: model, location: location, rate: rate, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status}) 
      }
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.title, item.rating, item.model, item.location, item.rate, item.pickupdate, item.dropoffdate, item.status)}>
        <Card
          key={item.key}
          title={item.title}
          rating={item.rating}
          model={item.model}
          location={item.location}
          rate={item.rate}
          status={item.status}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList data={searchData} renderItem={renderCard}></FlatList>;
};

export default SentRequests;
