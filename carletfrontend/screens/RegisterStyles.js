import { StyleSheet, Dimensions } from "react-native";
const win = Dimensions.get('window')


const height = (win.width/350)*320
const buttonHeight = win.height - 104;

const RegisterStyles = StyleSheet.create({
    
    yellowvector: {
        width: win.width,
        height: height
    },

    container: {
        flex: 1
    },

    registertext: {
        position: 'relative',
        width:360,
        top: -50,
        alignSelf: 'center',
        fontFamily: "Nunito-SemiBold",
        fontSize: 34,
        textAlign: 'center'
    },

    bodytext: {
        width: 300,
        position: 'relative',
        top: -40,
        alignSelf: 'center',
        fontSize: 18,
        textAlign: 'center',
        fontFamily:"Nunito-Regular"
    },
    smallcar : {
        width: 40,
        height: 20,
        position: "absolute",
        top: win.height - 36,
        right: 16,
        
    },
    buttonposition: {
        position: "absolute",
        alignSelf:'center',
        top: buttonHeight,
        marginTop: 10,
    }
})


export default RegisterStyles;
