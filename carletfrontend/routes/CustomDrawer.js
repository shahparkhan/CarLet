import React, { useEffect, useState, useContext } from "react";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Context from "./../shared/context";

const ModalPopUp = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible);

  useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  );
};

export default function ContentContainer({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      if (Platform.OS !== "web") {
        try {
          const {
            status,
          } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== `granted`) {
            alert("Permission denied!");
          }
        } catch (error) {}
      }
    }
    fetchData();
  }, []);

  const PickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // console.log("rrr", result)
      setImage(`data:image/jpeg;base64,${result.base64}`);
      if (!result.cancelled) {
        // setImage(result.uri)
      }
    } catch (error) {
      console.log("bc", error);
    }
  };
  const { profilepic, profilename } = useContext(Context);

  const logoutHandler = async () => {
    try {
      await AsyncStorage.setItem("@isloggedin", "0");
    } catch (e) {
      console.log("loggedout error: ", e);
    }
    navigation.navigate("Welcome");
  };

  return (
    <TouchableOpacity activeOpacity={1} style={styles.drawerTransparent}>
      <TouchableOpacity activeOpacity={1} style={styles.drawer}>
        <View style={{ height: 178, backgroundColor: "#ffc107" }}>
          <ModalPopUp visible={visible}>
            <View style={{ alignItems: "center" }}>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => setVisible(false)}>
                  <Image
                    source={require("./../assets/cancel.png")}
                    style={{ height: 15, width: 15 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image
                source={profilepic}
                style={{
                  height: 150,
                  width: 150,
                  marginVertical: 10,
                  borderRadius: 50,
                }}
              />
            </View>

            <TouchableOpacity onPress={PickImage}>
              <Text
                style={{
                  textAlign: "center",
                  position: "relative",
                  fontFamily: "Nunito-SemiBold",
                  fontSize: 14,
                }}
              >
                Upload new photo
              </Text>
            </TouchableOpacity>
          </ModalPopUp>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Image source={profilepic} style={styles.imageStyle} />
          </TouchableOpacity>
          <Text style={styles.name}>{profilename}</Text>
        </View>
        <ScrollView>
          {/* // navigation.navigate("AccountSettings") */}
          <TouchableOpacity onPress={() => navigation.navigate("AccountMenu")}>
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

          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterVehicle1")}
          >
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

          <TouchableOpacity onPress={() => navigation.navigate("Wallet1")}>
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

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 10,
    alignItems: "flex-end",
    justifyContent: "center",
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
    fontSize: 16,
    textAlign: "left",
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16,
    width: "50%",
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
