import React from "react";
import { View, Image } from "react-native";
import SignUpStyles from "./SignUpStyles";

const SignUpView = (props) => {
  return (
    <View style={SignUpStyles.viewContainer}>
      {/* <Image
        style={SignUpStyles.yellowvector}
        source={require("./../assets/SignupVector.png")}
      /> */}
      {props.children}
    </View>
  );
};

export default SignUpView;
