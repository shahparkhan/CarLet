import React from "react";
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Card from "../assets/components/YourVehicleCard";

const YourVehicles = ({ navigation }) => {
  const searchData = navigation.getParam('result')
  const onPressHandler = async (id, title, model) => {
    navigation.navigate("EditVehicle", { title: title, model: model, vehicle_id: id });
  };

  const renderCard = ({ item, index, separators }) => {
    return (
      <TouchableOpacity 
        onPress={() => onPressHandler(item.vehicle_id, item.vehicle_name, item.vehicle_model)}>
        <Card key={item.vehicle_id} title={item.vehicle_name} model={item.vehicle_model} rate={item.rate} status={item.status}/>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.topbar}>
        <View
          style={{
            ...styles.button,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 1,
          }}
          onTouchStart={() => navigation.navigate("AccountMenu")}
        >
          <TouchableOpacity>
            <Text style={styles.buttontext}>PROFILE</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.button,
            borderBottomWidth: 1,
            borderBottomColor: "#ffa000",
          }}
        >
          <TouchableOpacity>
            <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
              VEHICLE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.heading}>Your Vehicles</Text>
      <FlatList data={searchData} renderItem={renderCard} keyExtractor={item => item.vehicle_id}></FlatList>
      <Image
        style={styles.smallcar}
        source={require("./../assets/smallcar.png")}
      />
    </View>
  );
};

const win = Dimensions.get("window");
const smallcarheight = win.height - 116;

const styles = StyleSheet.create({
  heading: {
    position: "relative",
    marginTop: 16,
    justifyContent:"flex-start",
    alignSelf: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: "center",
  },
  smallcar: {
    width: 40,
    height: 20,
    position: "absolute",
    top: smallcarheight,
    right: 16,
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
});

export default YourVehicles;
