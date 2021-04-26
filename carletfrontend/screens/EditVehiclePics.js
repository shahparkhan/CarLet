import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
  Alert,
} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImageManipulator from 'expo-image-manipulator';


const RegisterVehicle4 = ({ navigation }) => {
  const [Pics, setPics] = useState(navigation.getParam('result'));
  const [ImageCount, setImageCount] = useState(navigation.getParam('image_count'));
  const [Error, setError] = useState("");
  const pickImage = async (index) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true
      });
      // console.log(result)
      if (!result.cancelled) {
        let pics = [...Pics];
        const manipResult = await ImageManipulator.manipulateAsync(result.uri,[{resize: {height:500}}],{ compress: 0.3, base64:true});
        pics[index] = { uri: `data:image/jpeg;base64,${manipResult.base64}` };
        setPics([...pics]);
        setImageCount((state) => state + 1);
      }
    } catch (error) {
      console.log("bc", error);
    }
  };

  const deleteimage = (index) => {
    if (index === 0 || index === 1) {
      Alert.alert(
        "You cannot delete the first two images."
      )
    } else {
      let pics = [...Pics];
      pics[index] = {
        uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
      };
      setPics(pics);
      setImageCount((state) => state - 1);
      }
    
  };

  const deleteAlert = (index) => {
    return Alert.alert(
      `Delete?`,
      "",
      [
        {
          text: "yes",
          onPress: () => deleteimage(index),
          style: "cancel",
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  };

  const onSubmit = async () => {
    if (ImageCount < 2) {
      setError("Please upload atleast 2 images");
    } else {
      setError("");
      let apiBody = {}
      let pics = [...Pics];
      for (let i = 0; i < 5;i++){
        console.log(pics[i].uri[0])
        if (pics[i].uri[0] === 'd'){
          if (i === 0) {
            apiBody.vehicle_picture1 = pics[i].uri
          } else if (i === 1) {
            apiBody.vehicle_picture2 = pics[i].uri
          } else if (i === 2) {
            apiBody.vehicle_picture3 = pics[i].uri
          } else if (i === 3) {
            apiBody.vehicle_picture4 = pics[i].uri
          } else if (i === 4) {
            apiBody.vehicle_picture5 = pics[i].uri
          }
        } else if (pics[i].uri === 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU'){
          if (i === 0) {
            apiBody.vehicle_picture1 = ""
          } else if (i === 1) {
            apiBody.vehicle_picture2 = ""
          } else if (i === 2) {
            apiBody.vehicle_picture3 = ""
          } else if (i === 3) {
            apiBody.vehicle_picture4 = ""
          } else if (i === 4) {
            apiBody.vehicle_picture5 = ""
          }
        }
      }

      // console.log("apiBody ", apiBody)

      let mytoken

      try{
          mytoken = await AsyncStorage.getItem("@mytoken")
      } catch (e) {
          console.log("error ", e)
      }
      console.log('api req')
      let vehicle_id =  navigation.getParam('vehicle_id')
      console.log("vehicleid ", vehicle_id)
      
      try {

          response = await fetch(`http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/vehiclesetting/${vehicle_id}/`,{
          method: 'patch',
          mode: 'no-cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': `Token ${mytoken}`
          },
          body: JSON.stringify(apiBody)
          })
          responseJson = await response.json()
          console.log('server response: ', responseJson)
          if (responseJson['Success'] != undefined){
              navigation.navigate('SuccessPrompt', {title: navigation.getParam('title'), body: navigation.getParam('successBody')})
          } else {
              navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})
          }
          
      } catch (error) {
        navigation.navigate('ErrorPrompt', {title: navigation.getParam('title'), body: navigation.getParam('errorBody')})
      }
    }
  };

  return (
    <View style={styles.mainview}>
      <Text style={styles.mainheading}>Edit Pictures</Text>

      <Text style={styles.instruction}>
        Click on an image to edit. Press and hold to delete
      </Text>
      <Text style={styles.error}>{Error}</Text>
      <View style={styles.imagebox}>
        <View style={styles.imageboxTop}>
          <Pressable
            onLongPress={() => deleteAlert(0)}
            onPress={() => pickImage(0)}
          >
            <Image source={Pics[0]} style={styles.imagestyle} />
          </Pressable>
          <Pressable
            onLongPress={() => deleteAlert(1)}
            onPress={() => pickImage(1)}
          >
            <Image source={Pics[1]} style={styles.imagestyle} />
          </Pressable>
          <Pressable
            onLongPress={() => deleteAlert(2)}
            onPress={() => pickImage(2)}
          >
            <Image source={Pics[2]} style={styles.imagestyle} />
          </Pressable>
        </View>
        <View style={styles.imageboxBottom}>
          <Pressable
            onLongPress={() => deleteAlert(3)}
            onPress={() => pickImage(3)}
          >
            <Image source={Pics[3]} style={styles.imagestyle} />
          </Pressable>
          <Pressable
            onLongPress={() => deleteAlert(4)}
            onPress={() => pickImage(4)}
          >
            <Image source={Pics[4]} style={styles.imagestyle} />
          </Pressable>
        </View>
      </View>

      <TouchableButton
        title="SUBMIT"
        onPress={onSubmit}
        buttonposition={styles.buttonposition}
      />
    </View>
  );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 184;

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    alignItems: "center",
  },
  mainheading: {
    fontSize: 34,
    fontFamily: "Nunito-Bold",
    color: "#212121",
    margin: 10,
  },
  imagebox: {},
  imageboxTop: {
    flexDirection: "row",
  },
  imageboxBottom: {
    flexDirection: "row",
  },
  plusimage: {
    height: 50,
    width: 50,
    margin: 5,
  },
  imagestyle: {
    height: 104,
    width: 104,
    margin: 5,
  },
  buttonposition: {
    alignSelf: "center",
    position: "absolute",
    top: buttonHeight,
  },
  instruction: {
    fontFamily: "Nunito-Regular",
    margin: 10,
  },
  error: {
    fontFamily: "Nunito-Regular",
    margin: 10,
    color: "tomato",
  },
});

export default RegisterVehicle4;
