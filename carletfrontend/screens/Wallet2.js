import React, { useState, useContext } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";
import Context from './../shared/context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Wallet2 = ({ navigation }) => {
  const [RedeemAmount, setRedeemAmount] = useState("");
  const {walletamount} = useContext(Context)


  const redeemHandler = async () => {
    let myuuid
    let mytoken
    try {
      myuuid = await AsyncStorage.getItem('@useruuid')
      mytoken = await AsyncStorage.getItem('@mytoken')
    } catch (e) {
      console.log("error: ", e)
    }

    const apiLink = `http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/redeemamount/${myuuid}/`
    const apiBody = JSON.stringify({
      redeem_amount: RedeemAmount
    })

    try {
      
      response = await fetch(apiLink,{
      method: 'patch',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${mytoken}`
      },
      body: apiBody
      })
      responseJson = await response.json()
      console.log('server response: ', responseJson)
      
    } catch (error) {
    }

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.topbar}>
          <View
              style={styles.button}
              onTouchStart={() => {
                navigation.navigate("Wallet3");
                console.log("dumb");
              }}
            >
              <TouchableOpacity>
                <Text style={styles.buttontext}>STATEMENT</Text>
              </TouchableOpacity>
          </View>
          <View
            style={styles.button}
            onTouchStart={() => navigation.navigate("Wallet1")}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>TOPUP</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.button,
              borderBottomColor: "#ffa000",
            }}
          >
            <TouchableOpacity>
              <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
                REDEEM{" "}
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <View
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.mainheading}>Wallet</Text>
          <View style={styles.card}>
            <Text style={styles.balance}>Balance</Text>
            <View style={styles.walletstyle}>
                <Image
                    source = {require('./../assets/wallet.png')}
                    style = {styles.walletImage}>
                </Image>
                
                <Text style = {styles.amount}>
                    {walletamount}.00
                </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.receipt}>Enter Amount</Text>
          <TextField
            placeholder="Redeem Amount"
            changeHandler={(e) => setRedeemAmount(e)}
            keyboardType="decimal-pad"
            style={{ width: "79%" }}
          ></TextField>
          <TouchableButton
            title="REDEEM"
            onPress={redeemHandler}
            buttonposition={{ marginTop: 16 }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  buttontext: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
  },
  mainheading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    marginTop: 10,
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "lightgrey",
    width: "100%",
    marginTop: 26,
    justifyContent:"flex-start"
  },
  balance: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
  },
  amount: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    color: 'black',
    fontFamily:"Nunito-Light",
    justifyContent:"flex-start"
  },
  receipt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    margin: 16,
  },
  walletstyle:{
    flexDirection:"row",
    justifyContent:"flex-start",
    marginBottom: 16,
    alignItems:"center",
  },
  walletImage:{
      height:24,
      width:24,
      marginLeft:16,
      marginTop: 8,
      justifyContent:"flex-start"
  },
});
export default Wallet2;
