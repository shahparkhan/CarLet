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
import TouchableButton from "../assets/components/TouchableButton";
import Context from './../shared/context';


const Wallet3 = ({ navigation }) => {
  const [TopupAmount, setTopupAmount] = useState("");
  const {walletamount} = useContext(Context)

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.topbar}>
        <View style={{ ...styles.button, borderBottomColor: "#ffa000" }}>
            <TouchableOpacity>
              <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
                STATEMENT
              </Text>
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
            style={styles.button}
            onTouchStart={() => navigation.navigate("Wallet2")}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>REDEEM</Text>
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
  upload: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    alignSelf: "center",
    
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
export default Wallet3;
