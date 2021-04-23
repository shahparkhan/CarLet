import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import Welcome from '../screens/Welcome'
import Login from '../screens/Login'
import ForgotPassword from '../screens/ForgotPassword'
import SignUp0 from '../screens/SignUp0'
import SignUp1 from '../screens/SignUp1'
import Register from '../screens/Register'
import Register1 from '../screens/Register1'
import Register2 from '../screens/Register2'
import Register3 from '../screens/Register3'
import Register4 from '../screens/Register4'
import Register5 from './../screens/Register5'
import Register6 from './../screens/Register6'
import Home from './../screens/Home'
import PickUpandDropOff from './../screens/PickUpandDropOff'
import SearchResults1 from './../screens/SearchResults1'
import CarDetails from './../screens/CarDetails'
import RequestSent from '../screens/RequestSent'
import RentRequests from '../screens/RentRequests'
import SentRequests from '../screens/SentRequests'
import SentRequestsApproval from '../screens/SentRequestsApproval'
import AccountSettings from '../screens/AccountSettings'
import EditProfile from '../screens/EditProfile'
import YourVehicles from '../screens/YourVehicles'
import EditVehicle from '../screens/EditVehicle'
import EditVehicleGeneral from '../screens/EditVehicleGeneral';
import EditVehicleDocs from '../screens/EditVehicleDocs';
import VehicleDocsGeneral from '../screens/VehicleDocsGeneral';
import AccountMenu from '../screens/AccountMenu';
import ChangePassword from '../screens/ChangePassword';
import Header1 from './../shared/Header';
import React from 'react';

const signedout = {
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
    Register: {
        screen: Register,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
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
    CarDetails: {
        screen: CarDetails,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    RequestSent: {
        screen: RequestSent,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    RentRequests: {
        screen: RentRequests,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    SentRequests: {
        screen: SentRequests,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    SentRequestsApproval: {
        screen: SentRequestsApproval,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    AccountSettings: {
        screen: AccountSettings,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    EditProfile: {
        screen: EditProfile,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    YourVehicles: {
        screen: YourVehicles,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    EditVehicle: {
        screen: EditVehicle,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    EditVehicleGeneral: {
        screen: EditVehicleGeneral,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    EditVehicleDocs: {
        screen: EditVehicleDocs,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    VehicleDocsGeneral: {
        screen: VehicleDocsGeneral,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },

    AccountMenu: {
        screen: AccountMenu,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({navigation}) => {
            return{
                headerLeft: ()=> null,
                headerTitle: () => <Header1 navigation = {navigation}/>,
            }   
        }
    },
}




const SignedOut = createStackNavigator(signedout, {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:"#ffc107"
        }
    }})

export default SignedOut


// const AuthStack = createStackNavigator()


// export default createAppContainer(createSwitchNavigator({
//     SignedIn: SignedIn,
//     SignedOut: SignedOut,
// },{
//     initialRouteName: loginstatus ? "SignedIn" : "SignedOut"
// }))

