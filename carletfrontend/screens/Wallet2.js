import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";

const Wallet2 = ({ navigation }) => {
  const [RedeemAmount, setRedeemAmount] = useState("");
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
            <Text style={styles.amount}>5000.00</Text>
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
            onPress={() => console.log("GENERATED")}
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
    height: 64,
    marginTop: 26,
  },
  balance: {
    fontFamily: "Nunito-Bold",
    fontSize: 16,
    paddingLeft: 10,
    paddingTop: 10,
    marginBottom: 9,
  },
  amount: {
    paddingLeft: 10,
    fontFamily: "Nunito-Regular",
  },
  receipt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    margin: 16,
  },
});
export default Wallet2;
