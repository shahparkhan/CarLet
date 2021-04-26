import React from "react";
import { View, Modal } from "react-native";
import TouchableButton from "./TouchableButton";
import CalendarPicker from "react-native-calendar-picker";
import Calendar from "react-native-calendar-range-picker";

const Calendar1 = ({ modalVisible, addDate, setModalVisible }) => {
  const addDateHandler = (e) => {
    // console.log(`adding date ${JSON.stringify(e)}`);
    // console.log("onChange");
    // const date = JSON.stringify(e).split("-");
    // const day = date[2].split("T")[0];
    // const month = date[1];
    // const year = date[0].replace('"', "");
    // addDate(`${day}/${month}/${year}`);
    const date = e.split("-")
    console.log(date)
    addDate(`${date[2]}/${date[1]}/${date[0]}`);
  };

  const setHeaderStyles = (e) => {
    // console.log("set header styles", e);
    return {
      style: {
        backgroundColor: "#FFC107",
        height: 35,
      },
      textStyle: {
        fontFamily: "Nunito-Regular",
        fontSize: 17,
      },
    };
  };

  return (
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      // selectedDayColor="#FFC107"
    >
    <View style={{ flex: 1 }}>
      <Calendar
        singleSelectMode={true}
        onChange={addDateHandler}
        disabledBeforeToday={true}
      />
    </View>
    <TouchableButton
        buttonposition={{ marginBottom: 48, alignSelf: "center" }}
        title="Done"
        onPress={() => setModalVisible(false)}
      ></TouchableButton>
    </Modal>
  )

  // return (
  //   <Modal
  //     animationType="slide"
  //     transparent={false}
  //     visible={modalVisible}
  //     onRequestClose={() => {
  //       // Alert.alert("Modal has been closed.");
  //       setModalVisible(!modalVisible);
  //     }}
  //     // selectedDayColor="#FFC107"
  //   >
  //     <View
  //       style={{
  //         borderRadius: 6,
  //         elevation: 1,
  //         shadowOffset: { width: 1, height: 1 },
  //         shadowOpacity: 0.1,
  //         shadowRadius: 2,
  //         alignItems: "center",
  //         justifyContent: "center",
  //         marginTop: 20,
  //       }}
  //       >
        
  //       <CalendarPicker
  //         onDateChange={addDateHandler}
  //         selectedDayColor="#FFC107"
  //         todayBackgroundColor="white"
  //         scrollable={true}
  //         nextTitleStyle={{
  //           borderRadius: 8,
  //           borderColor: "black",
  //           borderWidth: 0,
  //           width: 50,
  //           paddingLeft: 10,
  //           fontSize: 15,
  //         }}
  //         previousTitle="Prev"
  //         previousTitleStyle={{
  //           borderRadius: 8,
  //           borderColor: "black",
  //           borderWidth: 0,
  //           width: 50,
  //           paddingLeft: 10,
  //           fontSize: 15,
  //         }}
  //         headerWrapperStyle={{
  //           backgroundColor: "#FFA000",
  //           height: 50,
  //         }}
  //         yearTitleStyle={{ fontFamily: "Nunito-Bold", fontSize: 17 }}
  //         monthTitleStyle={{ fontFamily: "Nunito-Bold", fontSize: 17 }}
  //         customDayHeaderStyles={setHeaderStyles}
  //       ></CalendarPicker>
  //     </View>
  //     <TouchableButton
  //       buttonposition={{ marginTop: 20, alignSelf: "center" }}
  //       title="Done"
  //       onPress={() => setModalVisible(false)}
  //     ></TouchableButton>
  //   </Modal>
  // );
};

export default Calendar1;
