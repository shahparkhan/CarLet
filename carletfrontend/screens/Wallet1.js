import React, { useState, useContext, useEffect } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import TextField from "../assets/components/TextField";
import TouchableButton from "../assets/components/TouchableButton";
import Context from './../shared/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


const Wallet1 = ({ navigation }) => {
  const [TopupAmount, setTopupAmount] = useState("");
  const {walletamount} = useContext(Context)

  useEffect(()=>
    {
        async function fetchData(){
            if (Platform.OS !== 'web')
            {
                try {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if ( status !== `granted`)
                    {
                        alert('Permission denied!')
                    }
                } catch (error) {

                }
                
            }
        }
        fetchData()
        
    },[])

    const PickImage = async () =>{
        try {
            let result  = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4,3],
                quality:1,
                base64:true,
            })
            // console.log(result)
            if (!result.cancelled)
            {
                // setImage(`data:image/jpeg;base64,${result.base64}`)
                let myuuid
                let mytoken
                try {
                  myuuid = await AsyncStorage.getItem('@useruuid')
                  mytoken = await AsyncStorage.getItem('@mytoken')
                } catch (e) {
                  console.log("error: ", e)
                }

                const apiLink = 'http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/uploadreceipt/'
                const apiBody = JSON.stringify({
                  user_id: myuuid,
                  proof_of_payment: `data:image/jpeg;base64,${result.base64}`
                })

                try {
                  
                  response = await fetch(apiLink,{
                  method: 'post',
                  mode: 'no-cors',
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': `Token ${mytoken}`
                  },
                  body: apiBody
                  })
                  responseJson = await response.json()
                  console.log('server response: ', responseJson)
                  
                } catch (error) {
                }
            }
        } catch (error) {
            console.log("bc", error)
        }
        
        
    }

  const generateHandler = async () => {
    let myuuid
    let mytoken
    try {
      myuuid = await AsyncStorage.getItem('@useruuid')
      mytoken = await AsyncStorage.getItem('@mytoken')
    } catch (e) {
      console.log("error: ", e)
    }

    const apiLink = 'http://ec2-65-0-12-151.ap-south-1.compute.amazonaws.com/generatereceipt/'
    const apiBody = JSON.stringify({
      user_id: myuuid,
      amount: TopupAmount
    })

    try {
      
      response = await fetch(apiLink,{
      method: 'post',
      mode: 'no-cors',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${mytoken}`
      },
      body: apiBody
      })
      responseJson = await response.json()
      console.log('server response: ', responseJson)
      
    } catch (error) {
    }

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.topbar}>
        <View
            style={{
              ...styles.button,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            onTouchStart={() => navigation.navigate("Wallet3")}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>STATEMENT</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              ...styles.button,
              borderBottomWidth: 1,
              borderBottomColor: "#ffa000",
            }}
          >
            <TouchableOpacity>
              <Text style={{ ...styles.buttontext, color: "#ffa000" }}>
                TOPUP
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...styles.button,
              borderBottomColor: "lightgrey",
              borderBottomWidth: 1,
            }}
            onTouchStart={() => navigation.navigate("Wallet2")}
          >
            <TouchableOpacity>
              <Text style={styles.buttontext}>REDEEM </Text>
            </TouchableOpacity>
          </View>
          
        </View>

        <View
          style={{
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.mainheading}>Wallet</Text>
          
          <View style={styles.card}>
            <Text style={styles.balance}>Balance</Text>
            <View style={styles.walletstyle}>
                <Image
                    source = {require('./../assets/wallet.png')}
                    style = {styles.walletImage}>
                </Image>
                
                <Text style = {styles.amount}>
                    {walletamount}.00
                </Text>
            </View>
            {/* <Text style={styles.amount}>{walletamount}.00</Text> */}
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Text style={styles.receipt}>Generate Receipt</Text>
          <TextField
            placeholder="Topup Amount"
            changeHandler={(e) => setTopupAmount(e)}
            keyboardType="decimal-pad"
            style={{ width: "79%" }}
          ></TextField>
          <TouchableButton
            title="GENERATE"
            onPress={generateHandler}
            buttonposition={{ marginTop: 16 }}
          />
        </View>
        <Text style={styles.upload}>Upload Receipt</Text>
        <TouchableButton
          title="UPLOAD"
          onPress={PickImage}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  topbar: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: "#212121",
  },
  mainheading: {
    fontFamily: "Nunito-Bold",
    fontSize: 34,
    marginTop: 10,
  },
  card: {
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "lightgrey",
    width: "100%",
    marginTop: 26,
    justifyContent:"flex-start"
  },
  
  
  amount: {
    fontSize: 14,
    textAlign: 'left',
    marginLeft: 16,
    marginRight: 16,
    marginTop: 8,
    color: 'black',
    fontFamily:"Nunito-Light",
    justifyContent:"flex-start"
  },
  receipt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    margin: 16,
    alignSelf: "center",
  },
  upload: {
    fontFamily: "Nunito-SemiBold",
    fontSize: 24,
    color: "#263238",
    alignSelf: "center",
    margin: 16,
    marginTop: 32
  },
  walletstyle:{
    flexDirection:"row",
    justifyContent:"flex-start",
    marginBottom: 16,
    alignItems:"center",
  },
  walletImage:{
      height:24,
      width:24,
      marginLeft:16,
      marginTop: 8,
      justifyContent:"flex-start"
  },
  balance: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8,
    
  },
});
export default Wallet1;
