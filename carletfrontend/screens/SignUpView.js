import React from "react";
import { View, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import SignUpStyles from "./SignUpStyles";

const SignUpView = (props) => {
  return (
    <TouchableWithoutFeedback onPress = {() =>{Keyboard.dismiss()}}>
    
    <View style={SignUpStyles.viewContainer}>
      {/* <Image
        style={SignUpStyles.yellowvector}
        source={require("./../assets/SignupVector.png")}
      /> */}
      {props.children}
      <Image
          style={SignUpStyles.smallcar}
          source={require("./../assets/smallcar.png")}
    />
    </View>
    
    </TouchableWithoutFeedback>

  );
};

export default SignUpView;
