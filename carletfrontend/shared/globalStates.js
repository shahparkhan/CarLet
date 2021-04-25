import React, { useState, useEffect } from "react";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const globalState = () => {
  const [profilepic, setProfilepic] = useState({
    uri:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [HasPermission, setHasPermission] = useState(false);
  const [LocationState, setLocationState] = useState({
    coords: { longitude: 0, latitude: 0 },
  });
  const [profilename, setProfilename] = useState("Carlet User");
  const [walletamount, setWalletamount] = useState('0')

  useEffect(() => {
    const getUserLocation = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setLocation("Permission to access location was denied");
      } else {
        setHasPermission(true);
      }

      try {
        console.log("global state");
        let location = await Location.getCurrentPositionAsync({});
        console.log("here");
        setLocationState(location);


        console.log(`coords`, {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.log("error", error);
      }
    };
    getUserLocation();

    const profilepictureandname = async () => {
      try {
        let pic = await AsyncStorage.getItem("@profilepicture");
        console.log("pic: ", pic);
        setProfilepic({ uri: pic });
      } catch (e) {
        console.log("loggedout error: ", e);
      }
      try {
        let name = await AsyncStorage.getItem("@profilename");
        console.log("name: ", name);
        setProfilename(name);
      } catch (e) {
        console.log("loggedout error: ", e);
      }
      try {
        let wallet = await AsyncStorage.getItem('@walletamount')
        if (wallet != undefined){
            setWalletamount(wallet)
        }
      } catch (e) {
          console.log("loggedout error: ", e)
      }
    };
    profilepictureandname();
  }, []);

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case "setProfilepic":
        return setProfilepic(payload);
      case "getProfilepic":
        return profilepic;
      case "setProfilename":
        return setProfilename(payload);
      case "getProfilename":
        return profilename;
      case "getLocation":
        return LocationState;
      case "setLocation":
        return setLocationState(payload);
      case 'setWalletamount':
          return setWalletamount(payload)
      case 'getWalletamount':
          return walletamount
      default:
        return "default";
    }
  };
  return { profilepic, profilename,walletamount, LocationState, actions };
};

export default globalState;
