import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerActions,
} from "react-navigation-drawer";
import {
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Icon } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ContentContainer({ navigation }) {
  const [profilepic, setProfilepic] = useState({
    uri:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });
  const [profilename, setProfilename] = useState("Carlet User");

  useEffect(() => {
    // if(!props.fetched) {
    //     props.fetchRules();
    // }
    // console.log('mount it!');
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
    };
    profilepictureandname();
  }, []);

  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("@isloggedin", "0");
    } catch (e) {
      console.log("loggedout error: ", e);
    }
    navigation.navigate("Welcome");
  };

  const goToRegisterVehicle = () => {
    navigation.navigate("RegisterVehicle1");
  };

  const goToWallet = () => {
    navigation.navigate("Wallet1");
  };

  // const profilepicture = async () => {
  //     try {
  //         pic = await AsyncStorage.getItem('@profilepicture')

  //     } catch (e) {
  //         console.log("loggedout error: ", e)
  //     }

  //     return {uri:pic}
  // }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent}>
      <TouchableOpacity activeOpacity={1} style={styles.drawer}>
        <View style={{ height: 178, backgroundColor: "#ffc107" }}>
          <Image source={profilepic} style={styles.imageStyle} />
          <Text style={styles.name}>{profilename}</Text>
        </View>
        <ScrollView>
          <TouchableOpacity onPress={goToRegisterVehicle}>
            <View style={styles.optionStyle}>
              <MaterialIcons
                name="directions-car"
                size={24}
                color="black"
                style={styles.testIcon}
              />
              <Text style={styles.testText}> Register Vehicle </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={goToWallet}>
            <View style={styles.optionStyle}>
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color="black"
                style={styles.testIcon}
              />
              <Text style={styles.testText}> Wallet </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log("pressed");
            }}
          >
            <View style={styles.optionStyle}>
              <MaterialIcons
                name="settings"
                size={24}
                color="black"
                style={styles.testIcon}
              />
              <Text style={styles.testText}> Account Settings </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("RentRequests")}>
            <View style={styles.optionStyle}>
              <MaterialCommunityIcons
                name="bell"
                size={24}
                color="black"
                style={styles.testIcon}
              />
              <Text style={styles.testText}> Rent Requests </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={logoutHandler}>
            <View style={styles.optionStyle}>
              <MaterialIcons
                name="logout"
                size={24}
                color="black"
                style={styles.testIcon}
              />
              <Text style={styles.testText}> Logout </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  optionStyle: {
    flex: 1,
    flexDirection: "row",
    marginTop: 25,
  },

  drawerTransparent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  imageStyle: {
    position: "relative",
    height: 80,
    width: 80,
    marginTop: 40,
    borderRadius: 40,
    marginLeft: 16,
  },
  drawer: {
    flex: 1,
    backgroundColor: "white",
  },
  name: {
    fontSize: 20,
    textAlign: "left",
    marginLeft: 16,
    marginTop: 16,
    color: "white",
    fontFamily: "Nunito-Bold",
  },
  drawerText: {
    fontFamily: "Nunito-Bold",
    fontSize: 14,
    textAlign: "center",
    color: "black",
  },
  testIcon: {
    marginLeft: 16,
    alignSelf: "center",
  },
  testText: {
    fontFamily: "Nunito-Regular",
    fontSize: 14,
    textAlign: "center",
    color: "black",
    marginLeft: 8,
    alignSelf: "center",
  },
});
