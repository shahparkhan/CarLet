import React, { useState, useEffect } from "react";
import { Text, Modal, View, Image, StyleSheet, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapView from "react-native-maps";
import SignUpStyles from "./SignUpStyles";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";
import * as Location from "expo-location";
import AsyncStorage from '@react-native-async-storage/async-storage';
import RegisterStyles from "./RegisterStyles";
import * as Permissions from "expo-permissions";

const Home = ({ navigation }) => {
  const [IconColor, setIconColor] = useState("black");
  const [IsVisible, setIsVisible] = useState(false);
  const [Querry, setQuerry] = useState();

  const [Region, setRegion] = useState({ latitude: 0, longitude: 0 });
  const [HasPermission, setHasPermission] = useState(false);
  const [LocationResult, setLocationResult] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [Geocode, setGeocode] = useState();

  useEffect(() => {
    getGeocodeAsync = async (location) => {
      let geocode = await Location.reverseGeocodeAsync(location);
      setGeocode(geocode);
    };

    const getUserLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setLocationResult("Permission to access location was denied");
      } else {
        setHasPermission(true);
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      setLocationResult(location);

      try {
        getGeocodeAsync({ latitude, longitude });
        // Center the map on the location we just fetched.
        console.log(
          `coords`,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          },
          Region
        );
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        getUserLocation();
      } catch (error) {
        console.log(error);
      }
    };
  }, [HasPermission, Region]);

  const logoutHandler = async () => {
      try {
        await AsyncStorage.setItem('@isloggedin', '0')

      } catch (e) {
          console.log("loggedout error: ", e)
      }
      navigation.navigate("Welcome")
  }

  const regionChange = (newPlace) => {
    // console.log(`${newPlace["latitude"]},${newPlace["longitude"]}`);
    const coordinates = {
      latitude: newPlace["latitude"],
      longitude: newPlace["longitude"],
    };
    // console.log(coordinates);
    setRegion(coordinates);
  };

  const pressOut = () => {
    setIconColor("black");
    setIsVisible(false);
  };

  const addQuerry = (querry) => {
    setQuerry(querry);
    console.log(querry);
  };

  const searchFromBackEnd = () => {
    console.log("CLICKED", Querry);
    setIconColor("grey");
    navigation.navigate('PickUpandDropOff')
  };

  const goToInitialRegion = () => {
    let initialRegion = Region;
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
  };

  return (
    <View style={{...SignUpStyles.viewContainer, position:"relative", top:-50}}>
      <Image
        style={SignUpStyles.yellowvector}
        source={require("./../assets/YellowVector.png")}
      />
      <Modal
        visible={IsVisible}
        animationType="slide"
        onRequestClose={() => {
          setIsVisible(false);
        }}
        style={styles.modalStyle}
      >
        <View style={styles.searchbarMap}>
          <TextField
            placeholder="Find Vehicle"
            style={styles.text}
            changeHandler={addQuerry}
          ></TextField>
          <Pressable onPressIn={searchFromBackEnd} onPressOut={pressOut}>
            <MaterialIcons name="search" size={32} color={IconColor} />
          </Pressable>
        </View>

        <MapView
          provider="google"
          style={styles.map}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          onRegionChange={regionChange}
          initialRegion={{
            latitude: Region["latitude"],
            longitude: Region["longitude"],
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          <MapView.Marker title="You" coordinate={Region}></MapView.Marker>
        </MapView>
      </Modal>
      <Pressable
        onPressIn={() => {
          console.log("ON TOUCH IN!");
          setIsVisible(true);
          // console.log(IsVisible);
        }}
        onPressOut={() => console.log("ON TOUCH OUT!")}
        style={styles.searchbar}
      >
        <Text style={{ color: "#6A6A6A", fontFamily: "Nunito-Regular" }}>
          Find a Vehicle
        </Text>
        <MaterialIcons name="search" size={32} color={IconColor} />
      </Pressable>

      
      <Image
          style={RegisterStyles.smallcar}
          source={require("./../assets/smallcar.png")}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#212121",
    height: 56,
    borderRadius: 4,
    margin: 10,
    width: "90%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  searchbarMap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#212121",
    height: 56,
    borderRadius: 4,
    margin: 10,
    width: "90%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  text: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 30,
    paddingBottom: 10,
    paddingLeft: 10,
    marginRight: 7,
    borderColor: "white",
    height: 54,
    width: "200%",
    color: "#424242",
  },
  modalStyle: {
    alignItems: "center",
  },
  map: {
    flex: 1,
    backgroundColor: "blue",
  },
});
