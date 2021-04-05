import React, { useState } from "react";
import { Header } from "react-navigation-stack";
import {
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
} from "react-native";

const TextField = ({ placeholder, changeHandler, style, secureTextEntry }) => {
  const [enableshift, setEnableShift] = useState(false);
  const handleChange = (e) => {
    changeHandler(e);
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      style={styles.keyboard}
      enabled={enableshift}
    >
      <TextInput
        style={{ ...styles.default, ...style }}
        placeholder={placeholder}
        onChangeText={handleChange}
        onFocus={() => {
          setEnableShift(true);
        }}
        secureTextEntry={secureTextEntry}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: "#212121",
    padding: 16,
    borderRadius: 4,
    width: 328,
    height: 56,
    fontFamily: "Nunito-Light",
  },
});

export default TextField;
