import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Card from "../assets/components/Card";

const searchData = [
  {
    key: "1",
    title: "Honda Civic",
    model: "2018",
    rating: 1,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: [
      { url:require('../assets/Civic.png') },
      { url:require('../assets/icon.png') },
      { url:require('../assets/jenny.jpg') }
    ],
    owner: "Jenny",
    bio: "Ashir's girlfriend to be",
    
  },
  {
    key: "2",
    title: "Toyota Corolla",
    model: "2018",
    rating: 2,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: [
      { url:require('../assets/Civic.png') },
      { url:require('../assets/icon.png') },
      { url:require('../assets/jenny.jpg') }
    ],
    owner: "Jenny",
    bio: "Ashir's girlfriend to be",
  },
  {
    key: "3",
    title: "Honda City",
    model: "2018",
    rating: 3,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: [
      { url:require('../assets/Civic.png') },
      { url:require('../assets/icon.png') },
      { url:require('../assets/jenny.jpg') }
    ],
    owner: "Jenny",
    bio: "Ashir's girlfriend to be",
  },
  {
    key: "4",
    title: "Suzuki Mehran",
    model: "2018",
    rating: 4,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: [
      { url:require('../assets/Civic.png') },
      { url:require('../assets/icon.png') },
      { url:require('../assets/jenny.jpg') }
    ],
    owner: "Jenny",
    bio: "Ashir's girlfriend to be",
  },
  {
    key: "5",
    title: "Honda Civic",
    model: "2018",
    rating: 5,
    location: "DHA PHASE 8",
    rate: 1500,
    imagesrc: [
      { url:require('../assets/Civic.png') },
      { url:require('../assets/icon.png') },
      { url:require('../assets/jenny.jpg') }
    ],
    owner: "Jenny",
    bio: "Ashir's girlfriend to be",
  },
];

const SearchResults1 = ({navigation}) => {
  const onPressHandler = async (arr, title, rating, model, location, rate, owner, bio) => {
      navigation.navigate('CarDetails', {imagesrc:arr, title: title, rating: rating, model: model, location: location, rate: rate, owner: owner, bio: bio})
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => onPressHandler(item.imagesrc, item.title, item.rating, item.model, item.location, item.rate, item.owner, item.bio)}>
        <Card
          key={item.key}
          title={item.title}
          rating={item.rating}
          model={item.model}
          location={item.location}
          rate={item.rate}
          imagesrc={item.imagesrc[0]}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList data={searchData} renderItem={renderCard}></FlatList>;
};

export default SearchResults1;
