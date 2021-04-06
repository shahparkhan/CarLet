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
    position: "absolute",
    top: buttonHeight,
    marginTop: 10,
  },
  error: {
    color: "tomato",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16
  }
});

export default SignUpStyles;
