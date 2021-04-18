import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Welcome from './../screens/Welcome'
import Login from './../screens/Login'
import ForgotPassword from './../screens/ForgotPassword'
import SignUp0 from './../screens/SignUp0'
import SignUp1 from './../screens/SignUp1'
import Register from './../screens/Register'
import Register1 from './../screens/Register1'
import Register2 from './../screens/Register2'
import Register3 from './../screens/Register3'
import Register4 from './../screens/Register4'
import Register5 from './../screens/Register5'
import Register6 from './../screens/Register6'
import Home from './../screens/Home'
import PickUpandDropOff from './../screens/PickUpandDropOff'
import SearchResults1 from './../screens/SearchResults1'
import Header1 from './../shared/Header';
import React from 'react';



const signedin = {
    Register: {
        screen: Register,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }

    },
    Register6: {
        screen: Register6,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    Register5: {
        screen: Register5,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            headerShown: false,
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerShown: false,
        }
    },
    SignUp0: {
        screen: SignUp0,
        navigationOptions: {
            headerShown: false,
        }
    },
    SignUp1: {
        screen: SignUp1,
        navigationOptions: {
            headerShown: false,
        }
    },
    Register1: {
        screen: Register1,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    Register2: {
        screen: Register2,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    Register3: {
        screen: Register3,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    Register4: {
        screen: Register4,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    SignUp0: {
        screen: SignUp0,
        navigationOptions: {
            headerShown: false,
        }
    },
    SignUp1: {
        screen: SignUp1,
        navigationOptions: {
            headerShown: false,
        }
    },
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    PickUpandDropOff: {
        screen: PickUpandDropOff,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    SearchResults1: {
        screen: SearchResults1,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    
}


const SignedIn = createStackNavigator(signedin,{
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#ffc107"
        }
    }}
    )

export default SignedIn


// const AuthStack = createStackNavigator()


// export default createAppContainer(createSwitchNavigator({
//     SignedIn: SignedIn,
//     SignedOut: SignedOut,
// },{
//     initialRouteName: loginstatus ? "SignedIn" : "SignedOut"
// }))

