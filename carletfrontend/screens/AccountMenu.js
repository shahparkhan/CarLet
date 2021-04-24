import React, {useContext} from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Context from "./../shared/context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountMenu = ({ navigation }) => {
  const {profilename} = useContext(Context)
  const credentialHandler = () => {
    navigation.navigate("EditProfile", {title:"Edit Profile", successBody:"Your credentials have been updated successfully!", errorBody:"There was some error while updating your credentials. Please try again later."});
  };
  const passwordHandler = () => {
    navigation.navigate("ChangePassword", {title:"Change Password", successBody:"Your password has been updated successfully!", errorBody:"There was some error while updating your password. Please try again later."});
  };

  const vehicleHandler = async () => {

    let mytoken
    let myuuid
    try{
      mytoken = await AsyncStorage.getItem('@mytoken')
      myuuid = await AsyncStorage.getItem('@useruuid')
    } catch (e) {
      console.log('error: ', e)
    }

    

    try {
        response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/uservehicle/${myuuid}/`,{
        method: 'get',
        mode: 'no-cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Token ${mytoken}`
        },
        })

        responseJson = await response.json()
        console.log('server response: ', responseJson)
        
        if (responseJson['Success'] != undefined){
          navigation.navigate("YourVehicles", {result: responseJson['Success']})
        }
        
    } catch (error) {
        console.log("error: ", error)
    }
    
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.topbar}>
        <View
          style={{
            ...styles.button,
            borderBottomWidth: 1,
            borderBottomColor: "#ffa000",
          }}
        >
          <TouchableOpacity>
            <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
              PROFILE
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.button,
            borderBottomColor: "lightgrey",
            borderBottomWidth: 1,
          }}
          onTouchStart={vehicleHandler}
        >
          <TouchableOpacity>
            <Text style={styles.buttontext}>VEHICLE</Text>
          </TouchableOpacity>
        </View>
      </View>
     
      <ScrollView contentContainerStyle={{alignItems:"center"}}>
      <Text style={styles.heading}>{profilename}</Text>

      <View style={styles.optionbox}>
        <TouchableOpacity onPress={credentialHandler} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Credentials</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={passwordHandler} style={styles.touch}>
          <View style={styles.card}>
            <Text style={styles.text}>Edit Password</Text>
          </View>
        </TouchableOpacity>
        
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    position: "relative",
    marginTop: 36,
    width: 360,
    alignSelf: "center",
    fontFamily: "Nunito-SemiBold",
    fontSize: 34,
    textAlign: "center",
  },
  options: {
    marginTop: 47,
    borderTopColor: "#D8D8D8",
    borderTopWidth: 1,
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
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 15,
  },
  touch: {
    width: "100%",
    marginBottom: 15,
  },
  optionbox: {
    alignItems: "center",
    width: "70%",
    marginTop: 40,
  },
  card: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    borderRadius: 3,
    
  },
});

export default AccountMenu;
