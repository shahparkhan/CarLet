import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import Card from "../assets/components/ReceivedRequestCard";

const searchData = [
  {
    key: "1",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    requester: "Dua Lipa",
    rate: "15000",
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Dropoff Done"
    
  },
  {
    key: "2",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    requester: "Dua Lipa",
    pickupdate: "15/2/2021",
    rate: "15000",
    dropoffdate: "25/2/2021",
    status: "Approval Pending"
  },
  {
    key: "3",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    requester: "Dua Lipa",
    rate: "15000",
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "In Progress"
  },
  {
    key: "4",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    requester: "Dua Lipa",
    rate: "15000",
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Payment Pending"
  },
  {
    key: "5",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    requester: "Dua Lipa",
    rate: "15000",
    pickupdate: "15/2/2021",
    dropoffdate: "25/2/2021",
    status: "Payment Done"
  },
];

const SentRequests = ({navigation}) => {
  const onPressHandler = async (title, rating, model, requester, pickupdate, dropoffdate, status, rate) => {
      if (status === "Approval Pending") {
        navigation.navigate('ReceivedRequestsApproval', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate}) 
      } 
      if (status === "Payment Pending"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate}) 
      }
      if (status === "Payment Done"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate}) 
      }
      if (status === "In Progress"){
        navigation.navigate('ReceivedRequestsPayment', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate}) 
      }
      if (status === "Dropoff Done"){
        navigation.navigate('ReceivedRequestsDropoff', {title: title, rating: rating, model: model, requester: requester, pickupdate: pickupdate, dropoffdate: dropoffdate, status:status, rate:rate}) 
      }
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.title, item.rating, item.model, item.requester, item.pickupdate, item.dropoffdate, item.status, item.rate)}>
        <Card
          key={item.key}
          title={item.title}
          rating={item.rating}
          model={item.model}
          requester={item.requester}
          rate={item.rate}
          status={item.status}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList data={searchData} renderItem={renderCard}></FlatList>;
};

export default SentRequests;
