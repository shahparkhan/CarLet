import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Card from "../assets/components/Card";

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
  {
    key: "2",
    title: "Toyota Corolla",
    model: "2018",
    rating: 5,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: "none",
  },
  {
    key: "3",
    title: "Honda City",
    model: "2018",
    rating: 5,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: "none",
  },
  {
    key: "4",
    title: "Suzuki Mehran",
    model: "2018",
    rating: 5,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: "none",
  },
  {
    key: "5",
    title: "Honda Civic",
    model: "2018",
    rating: 5,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: "none",
  },
];

const SearchResults1 = () => {
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => console.log("OnPress Called")}>
        <Card
          key={item.key}
          title={item.title}
          rating={item.rating}
          model={item.model}
          location={item.location}
          rate={item.rate}
          imagesrc={item.imagesrc}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList data={searchData} renderItem={renderCard}></FlatList>;
};

export default SearchResults1;
