import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RentRequests({ navigation }) {
  const onSentHandler = async () => {
    let mytoken = "";
    let myuuid = "";
    // useruuid

    try {
      mytoken = await AsyncStorage.getItem("@mytoken");
      myuuid = await AsyncStorage.getItem("@useruuid");
      console.log("token: ", mytoken);
      console.log("uuid: ", myuuid);
    } catch (error) {
      console.error("Failed to get token/uuid: ", error);
    }

    const sentrequestsdetails = JSON.stringify({
      user_id: myuuid,
    });
    let responseJson;
    try {
      let response = await fetch(
        "http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/sentrentrequest/",
        {
          method: "post",
          mode: "no-cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Token ${mytoken}`,
          },
          body: sentrequestsdetails,
        }
      );
      console.log("here: ");
      responseJson = await response.json();
      console.log("here2");
      console.log("server response: ", responseJson);
      if (responseJson["Success"] != undefined) {
        navigation.navigate("SentRequests", { result: responseJson["result"] });
      } else if (responseJson["Error"] != undefined) {
      }
    } catch (error) {
      console.error("server error: ", error);
    }
  };
  const onReceivedHandler = () => {
    navigation.navigate("ReceivedRequests");
  };

  return (
    <View
      style={{ ...RegisterStyles.container, position: "relative", top: -50 }}
    >
      <Image
        style={RegisterStyles.yellowvector}
        source={require("./../assets/rentrequestsvector.png")}
      />
      <Text style={RegisterStyles.registertext}>Rent Request</Text>
      <Text style={RegisterStyles.bodytext}>
        Explore the rent requests you have sent and received
      </Text>
      <View style={styles.buttonposition}>
        <TouchableButton title="SENT" onPress={onSentHandler}></TouchableButton>
        <TouchableButton
          title="RECEIVED"
          onPress={onReceivedHandler}
          buttonposition={{ marginLeft: 16 }}
        ></TouchableButton>
      </View>
    </View>
  );
}

const win = Dimensions.get("window");

const height = (win.width / 350) * 320;
const buttonHeight = win.height - 104;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
  buttonposition: {
    alignSelf: "center",
    position: "absolute",
    top: buttonHeight,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heading: {},
});
