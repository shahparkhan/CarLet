import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import Card from "../assets/components/Card";



const SearchResults1 = ({navigation}) => {
  const searchData = navigation.getParam('results')
  console.log("search data: ", searchData)
  const onPressHandler = async (vehicle_id, arr, title, rating, model, location, rate, owner_fname, owner_lname, bio, owner_picture) => {
    const owner = `${owner_fname} ${owner_lname}`   
    console.log("pickup: ", navigation.getParam('pickupdate'))
    console.log("dropoff: ", navigation.getParam('dropoffdate'))
    let pickup = navigation.getParam('pickupdate').split("/")
    let dropoff = navigation.getParam('dropoffdate').split("/")
    
    pickup = `${pickup[1]}/${pickup[0]}/${pickup[2]}`
    dropoff = `${dropoff[1]}/${dropoff[0]}/${dropoff[2]}`

    let date1 = new Date(pickup)
    let date2 = new Date(dropoff)

    let Difference_In_Time = date2.getTime() - date1.getTime();
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    let total_amount = Difference_In_Days*rate


    // console.log({imagesrc:arr, title: title, rating: rating, model: model, location: location, rate: rate, owner: owner, bio: bio, owner_picture: owner_picture, duration: Difference_In_Days, cost: total_amount, pickup: navigation.getParam('djangopickup'), dropoff: navigation.getParam('djangodropoff'), uuid: navigation.getParam('uuid'), vehicle_id: vehicle_id})

    navigation.navigate('CarDetails', {imagesrc:arr, title: title, rating: rating, model: model, location: location, rate: rate, owner: owner, bio: bio, owner_picture: owner_picture, duration: Difference_In_Days, cost: total_amount, pickup: navigation.getParam('djangopickup'), dropoff: navigation.getParam('djangodropoff'), uuid: navigation.getParam('uuid'),token: navigation.getParam('token'), vehicle_id: vehicle_id})
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
          onPressHandler(item.vehicle_id, pictures, item.vehicle_name, item.vehicle_rating, item.vehicle_model, item.vehicle_street_address, item.daily_rate, item.first_name,item.last_name, "item.bio", item.picture)

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
