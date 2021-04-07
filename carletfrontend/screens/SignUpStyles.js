import { StyleSheet, Dimensions } from "react-native";

const win = Dimensions.get("window");
const buttonHeight = win.height - 104;
const height = (win.width / 350) * 320;

const SignUpStyles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: "center",
  },
  yellowvector: {
    width: win.width,
    height: height,
  },
  buttonposition: {
    position: "relative",
    marginTop: 16,
    marginBottom: 48,
  },
  error: {
    color: "tomato",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16
  },
  smallcar: {
    width: 40,
    height: 20,
    position: "absolute",
    top: win.height -36,
    right: 16,
  }
});

export default SignUpStyles;
