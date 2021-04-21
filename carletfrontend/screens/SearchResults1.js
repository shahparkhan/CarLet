import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Card from "../assets/components/Card";



const SearchResults1 = ({navigation}) => {
  const searchData = navigation.getParam('results')
  console.log("search data: ", searchData)
  const onPressHandler = async (arr, title, rating, model, location, rate, owner_fname, owner_lname, bio, owner_picture) => {
    const owner = `${owner_fname} ${owner_lname}`   
    navigation.navigate('CarDetails', {imagesrc:arr, title: title, rating: rating, model: model, location: location, rate: rate, owner: owner, bio: bio, owner_picture: owner_picture})
  }
  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity onPress={() => {
          let pictures = []
          if (item.vehicle_picture1 != ""){
            pictures.push({url: item.vehicle_picture1})
          }
          if (item.vehicle_picture2 != ""){
            pictures.push({url: item.vehicle_picture2})
          }
          if (item.vehicle_picture3 != ""){
            pictures.push({url: item.vehicle_picture3})
          }
          if (item.vehicle_picture4 != ""){
            pictures.push({url: item.vehicle_picture4})
          }
          if (item.vehicle_picture5 != ""){
            pictures.push({url: item.vehicle_picture5})
          }
          onPressHandler(pictures, item.vehicle_name, item.vehicle_rating, item.vehicle_model, item.vehicle_street_address, item.daily_rate, item.first_name,item.last_name, "item.bio", item.picture)

        }}>
        <Card
          key={item.vehicle_id}
          title={item.vehicle_name}
          rating={item.vehicle_rating}
          model={item.vehicle_model}
          location={item.vehicle_street_address}
          rate={item.daily_rate}
          imagesrc={item.vehicle_picture1}
        />
      </TouchableOpacity>
    );
  };

  return <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.vehicle_id}></FlatList>;
};

export default SearchResults1;
