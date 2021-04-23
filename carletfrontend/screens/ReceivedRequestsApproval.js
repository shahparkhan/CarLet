import React, { useState, useEffect } from "react";
import { ScrollView, Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import ReceivedRequestCard1 from "../assets/components/ReceivedRequestCard1";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';


const ReceivedRequestsApproval = ({navigation}) => {
  console.log("title: ", navigation.getParam('title'))
  const onPressHandler = async () => {
    const apiLink = 'http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/approverequest/'
    const apiBody = JSON.stringify({
      trip_id: navigation.getParam('trip_id')
    })

    let mytoken

    try {
      mytoken = await AsyncStorage.getItem('@mytoken')
      console.log("token: ", mytoken)

    } catch (e) {
      console.log("error: ", e)
    }

    navigation.navigate('CautionPrompt', {title: 'Approval', successBody: 'The rent request was successfully approved!', errorBody: 'There was some error with the approval. Please try again later.', apiLink: apiLink, apiBody: apiBody, token:mytoken})
  }

  

  return (
    <View>
      <ScrollView>
      <Text style={styles.heading}>
        {navigation.getParam('status')}
      </Text>
        <ReceivedRequestCard1
          title={navigation.getParam('title')}
          rating={navigation.getParam('rating')}
          model={navigation.getParam('model')}
          requester={navigation.getParam('requester')}
          pickupdate={navigation.getParam('pickupdate')}
          dropoffdate={navigation.getParam('dropoffdate')}
          status={navigation.getParam('status')}
          rate={navigation.getParam('rate')}
        >
        </ReceivedRequestCard1>
        <TouchableButton
            title="APPROVE"
            buttonposition={styles.buttonposition}
            onPress={onPressHandler}
        >
        </TouchableButton>
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
    position:"relative", 
    marginTop:16
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
  
export default ReceivedRequestsApproval;
  