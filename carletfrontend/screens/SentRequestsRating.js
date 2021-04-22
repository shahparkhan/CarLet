import React, { useState, useEffect } from "react";
import { ScrollView, Image, Text, View, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import SentRequestCard1 from "../assets/components/SentRequestCard1";
import TouchableButton from "../assets/components/TouchableButton";
import RegisterStyles from "./RegisterStyles";
import { Rating, AirbnbRating } from 'react-native-ratings';

const SentRequestsRating = ({navigation}) => {
    const onPressHandler = () => {
        navigation.navigate('CautionPrompt', {title: 'Rating', successBody: 'Thankyou! Your rating was successfully registered.', errorBody: 'There was some error with rating. Please try again.'})
    }

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
    }

    return (
        <View>
            
            <Text style={styles.heading}>
            Rating
            </Text>
            <Text style = {styles.bodytext}>
                How would you rate the owner and the vehicle?
            </Text>

            <View style={styles.rating}>
                <AirbnbRating
                    
                    onFinishRating={ratingCompleted}
                    selectedColor={"#ffc107"}
                />
            </View>
            <TouchableButton
                title="SUBMIT"
                buttonposition={styles.buttonposition}
                onPress={onPressHandler}
            >

            </TouchableButton>
            <Image
                    style={styles.smallcar}
                    source={require("./../assets/smallcar.png")}
            />
        </View>
    );
};

const win = Dimensions.get("window");
const buttonHeight = win.height - 186;
const smallcarheight = win.height - 116
const ratingheight = win.height/2
const height = (win.width / 350) * 320;

const styles = StyleSheet.create({
    buttonposition:{
        position: "absolute",
        top: buttonHeight,
    },
    heading: {
        position: 'relative',
        marginTop: 36,
        width:360,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },
    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: smallcarheight,
        right: 16,
    },
    rating:{
        alignItems:"center",
        marginTop: 48
    },
    bodytext:{
        position: "relative",
        width:"80%",
        marginTop: 16,
        alignSelf: "center",
        fontSize: 18,
        textAlign: 'center',
        fontFamily:"Nunito-Regular"
    }

})
  
export default SentRequestsRating;
  