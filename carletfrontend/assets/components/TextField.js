import React, { useState } from "react";
import { Header } from "react-navigation-stack";
import {
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";

const TextField = ({
  placeholder,
  changeHandler,
  style,
  secureTextEntry,
  keyboardType,
}) => {
  const [enableshift, setEnableShift] = useState(false);
  const handleChange = (e) => {
    changeHandler(e);
  };

  return (
    <TextInput
      style={{ ...styles.default, ...style }}
      placeholder={placeholder}
      onChangeText={handleChange}
      onFocus={() => {
        setEnableShift(true);
      }}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
    />
  );
};

const win = Dimensions.get("window");

const styles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: "#212121",
    padding: 16,
    borderRadius: 4,
    width: win.width - 32,
    height: 56,
    fontFamily: "Nunito-Light",
  },
});

export default TextField;
