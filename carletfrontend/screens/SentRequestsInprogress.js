import React, { useState, useEffect } from "react";
import { ScrollView, Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import SentRequestCard1 from "../assets/components/SentRequestCard1";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
  

const SentRequestsInprogress = ({navigation}) => {

  const booknowHandler = () => {
    navigation.navigate("RequestSent")
  }

  

  return (
    <View>
      <ScrollView>
      <Text style={styles.heading}>
        {navigation.getParam('status')}
      </Text>
        <SentRequestCard1
          title={navigation.getParam('title')}
          rating={navigation.getParam('rating')}
          model={navigation.getParam('model')}
          location={navigation.getParam('location')}
          rate={navigation.getParam('rate')}
          pickupdate={navigation.getParam('pickupdate')}
          dropoffdate={navigation.getParam('dropoffdate')}
          status={navigation.getParam('status')}
        >
        </SentRequestCard1>
        </ScrollView>
        <Image
                style={styles.smallcar}
                source={require("./../assets/smallcar.png")}
        />
    </View>
  );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 186;
const smallcarheight = win.height - 116
const height = (win.width / 350) * 320;

const styles = StyleSheet.create({
  buttonposition:{
    position: "absolute",
    top: buttonHeight,
  },
  heading: {
    position: 'relative',
    marginTop: 36,
    width:360,
    alignSelf: 'center',
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: 'center'
},
smallcar : {
    width: 40,
    height: 20,
    position: "absolute",
    top: smallcarheight,
    right: 16,
},
})
  
export default SentRequestsInprogress;
  