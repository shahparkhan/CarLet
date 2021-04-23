import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const AccountMenu = ({ navigation }) => {
  const credentialHandler = () => {
    navigation.navigate("EditProfile");
  };
  const passwordHandler = () => {
    navigation.navigate("ChangePassword");
  };

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
          onTouchStart={() => navigation.navigate("YourVehicles")}
        >
          <TouchableOpacity>
            <Text style={styles.buttontext}>VEHICLE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.heading}>HEADING</Text>

      <View style={styles.optionbox}>
        <TouchableOpacity onPress={passwordHandler} style={styles.touch}>
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
