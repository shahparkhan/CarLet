import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Modal, Dimensions } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import TouchableButton from "../assets/components/TouchableButton";
import SignUpStyles from "./SignUpStyles";
// import CalendarPicker from "react-native-calendar-picker";
import Calendar from "../assets/components/Calendar";

const PickUpandDropOff = ({navigation}) => {
  const [pickUpDate, setpickUpDate] = useState("");
  const [DropoffDate, setDropoffDate] = useState("");

  const [IconColor, setIconColor] = useState("black");
  const [IconColor2, setIconColor2] = useState("black");
  const [modalVisiblePickUp, setModalVisiblePickUp] = useState(false);
  const [modalVisibleDropOff, setModalVisibleDropOff] = useState(false);

  const [PickupText, setPickupText] = useState("Set Pickup");
  const [DropOffText, setDropOffText] = useState("Set Dropoff");

  const [Error, setError] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("");

  const [BorderColor, setBorderColor] = useState("#21212");

  const pressOutPickup = () => {
    setIconColor("black");
    setModalVisiblePickUp(true);
  };

  const pressIn = () => {
    setIconColor("grey");
  };

  const pressIn2 = () => {
    setIconColor2("grey");
  };

  const pressOutDropOff = () => {
    setIconColor("black");
    setIconColor2("black");
    setModalVisibleDropOff(true);
  };
  

  const onSearch = () => {
    //search from data base
    console.log(`Searching from ${pickUpDate} to ${DropoffDate}`);
    let pickup = pickUpDate;
    pickup = pickup.split("/");
    let dropoff = DropoffDate;
    dropoff = dropoff.split("/");

    if (parseInt(pickup[0]) >= parseInt(dropoff[0])) {
      setError(true);
      setErrorMsg("Pick up date can not be after drop off date");
      // setBorderColor("tomato");
    } else if (PickupText === 'Set Pickup' || DropOffText === 'Set Dropoff') {
      setError(true);
      setErrorMsg("Please enter both Pickup and Dropoff dates");
    } else {
      setError(false);
      setErrorMsg("");
      setBorderColor("#21212");

      console.log("BORDER COLOR", BorderColor);
      navigation.navigate("SearchResults1")
    }
  };

  return (
    <View style={{ alignItems: "center"}}>
      <Text style={styles.text}>Pickup and Dropoff</Text>

      <View style={styles.pickdropForm}>
        {Error ? <Text style={styles.error}>{ErrorMsg}</Text> : <Text style={styles.error}></Text>}
        <View style={{ ...styles.textboxwithicon, borderColor: BorderColor }}>
          <Text style={{ color: "#212121", fontFamily:"Nunito-Light" }}>{PickupText}</Text>
          <Pressable onPressIn={pressIn} onPressOut={pressOutPickup}>
            <MaterialIcons
              name="calendar-today"
              size={32}
              color={IconColor}
              style={styles.calender}
            />
          </Pressable>
        </View>
        <Calendar
          modalVisible={modalVisiblePickUp}
          addDate={(e) => {
            setpickUpDate(e);
            setPickupText(e);
            setBorderColor("#21212");
          }}
          setModalVisible={setModalVisiblePickUp}
        />
        <View style={{ ...styles.textboxwithicon, borderColor: BorderColor }}>
          <Text style={{ color: "#212121", fontFamily:"Nunito-Light" }}>{DropOffText}</Text>
          <Pressable onPressIn={pressIn2} onPressOut={pressOutDropOff}>
            <MaterialIcons
              name="calendar-today"
              size={32}
              color={IconColor2}
              style={styles.calender}
            />
          </Pressable>
        </View>
        <Calendar
          modalVisible={modalVisibleDropOff}
          addDate={(e) => {
            setDropoffDate(e);
            setDropOffText(e);
          }}
          setModalVisible={setModalVisibleDropOff}
        />
      </View>
      <TouchableButton
        buttonposition={styles.buttonposition}
        title="SEARCH"
        onPress={onSearch}
      ></TouchableButton>
    </View>
  );
};

export default PickUpandDropOff;

const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height-184;
const uploadHeight = win.height - 347;

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
  },
  text: {
    fontFamily: "Nunito-Bold",
    color: "#212121",
    marginTop: 146,
    fontSize: 35,
    alignSelf: "center",
    marginTop: 70,
  },
  pickdropForm: {
    // backgroundColor: "white",
    marginTop: 70,
    marginLeft: 18,
    marginRight: 35,
    width: "90%",
  },
  pickupHeading: {
    fontFamily: "Nunito-Bold",
    color: "#263238",
    fontSize: 30,
    marginLeft: 10,
  },
  textboxwithicon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderWidth: 1,
    borderColor: "#212121",
    height: 60,
    borderRadius: 4,
    margin: 10,
    width: "100%",
    paddingRight: 10,
    paddingLeft: 10,
  },
  pickuptext: {
    borderColor: "white",
    marginLeft: 4,
    width: "90%",
  },
  calender: {
    marginRight: 2,
  },
  error: {
    color: "tomato",
    alignSelf: "center",
    position: "relative",
    marginTop: -40,
    marginBottom: 16,
  },
  buttonposition: {
    alignSelf:'center',
    position: "absolute",
    top: buttonHeight
  }
});
