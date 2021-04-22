import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";

const Wallet3 = ({ navigation }) => {
  const [TopupAmount, setTopupAmount] = useState("");
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
            style={styles.button}
            onTouchStart={() => navigation.navigate("Wallet2")}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>REDEEM</Text>
            </TouchableOpacity>
          </View>
          <View style={{ ...styles.button, borderBottomColor: "#ffa000" }}>
            <TouchableOpacity>
              <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
                STATEMENT
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
            <Text style={styles.amount}>5000.00</Text>
          </View>
        </View>
        <Text style={styles.upload}>Generate Receipt</Text>
        <TouchableButton
          title="UPLOAD"
          onPress={() => console.log("UPLOADED")}
        />
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
  upload: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    alignSelf: "flex-start",
    paddingLeft: 30,
    margin: 16,
  },
});
export default Wallet3;
