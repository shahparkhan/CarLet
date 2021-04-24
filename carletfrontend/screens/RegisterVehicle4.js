import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import TouchableButton from "../assets/components/TouchableButton";
import * as ImagePicker from "expo-image-picker";

const RegisterVehicle4 = ({ navigation }) => {
  const [Pics, setPics] = useState([
    {
      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
    },
    {
      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
    },
    {
      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
    },
    {
      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
    },
    {
      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGtQCsunk92AAglsdBR7b_9Ghs9kI6HAvVYixOOau-ZUUkLph61rUbiIlKxaQMOtbSzg&usqp=CAU`,
    },
  ]);
  const [ImageCount, setImageCount] = useState(0);
  const [Error, setError] = useState("");

  const pickImage = async (index) => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      // console.log(result)
      if (!result.cancelled) {
        let pics = [...Pics];
        pics[index] = { uri: `data:image/jpeg;base64,${result.base64}` };
        setPics([...pics]);
        setImageCount(ImageCount + 1);
      }
    } catch (error) {
      console.log("bc", error);
    }
  };

  const onSubmit = () => {
    if (ImageCount < 2) {
      setError("Please upload atleast 2 images");
    } else {
      setError("");
    }
  };

  return (
    <View style={styles.mainview}>
      <Text style={styles.mainheading}>Pictures</Text>

      <Text style={styles.instruction}>Click on an image to upload it</Text>
      <Text style={styles.error}>{Error}</Text>
      <View style={styles.imagebox}>
        <View style={styles.imageboxTop}>
          <Pressable onPress={() => pickImage(0)}>
            <Image source={Pics[0]} style={styles.imagestyle} />
          </Pressable>
          <Pressable onPress={() => pickImage(1)}>
            <Image source={Pics[1]} style={styles.imagestyle} />
          </Pressable>
          <Pressable onPress={() => pickImage(2)}>
            <Image source={Pics[2]} style={styles.imagestyle} />
          </Pressable>
        </View>
        <View style={styles.imageboxBottom}>
          <Pressable onPress={() => pickImage(3)}>
            <Image source={Pics[3]} style={styles.imagestyle} />
          </Pressable>
          <Pressable onPress={() => pickImage(4)}>
            <Image source={Pics[4]} style={styles.imagestyle} />
          </Pressable>
        </View>
      </View>

      <TouchableButton
        title="NEXT"
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
