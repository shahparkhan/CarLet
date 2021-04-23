import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import Welcome from "./../screens/Welcome";
import Login from "./../screens/Login";
import ForgotPassword from "./../screens/ForgotPassword";
import SignUp0 from "./../screens/SignUp0";
import SignUp1 from "./../screens/SignUp1";
import Register from "./../screens/Register";
import Register1 from "./../screens/Register1";
import Register2 from "./../screens/Register2";
import Register3 from "./../screens/Register3";
import Register4 from "./../screens/Register4";
import Register5 from "./../screens/Register5";
import Register6 from "./../screens/Register6";
import Home from "./../screens/Home";
import PickUpandDropOff from "./../screens/PickUpandDropOff";
import SearchResults1 from "./../screens/SearchResults1";
import CarDetails from "./../screens/CarDetails";
import RequestSent from "../screens/RequestSent";
import RentRequests from "../screens/RentRequests";
import SentRequests from "../screens/SentRequests";
import SentRequestsApproval from "../screens/SentRequestsApproval";
import SentRequestsPayment from "../screens/SentRequestsPayment";
import SentRequestsPayment2 from "../screens/SentRequestsPayment2";
import SentRequestsInprogress from "../screens/SentRequestsInprogress";
import SentRequestsDropoff from "../screens/SentRequestsDropoff";
import SentRequestsRating from "../screens/SentRequestsRating";
import ReceivedRequests from "../screens/ReceivedRequests";
import ReceivedRequestsApproval from "../screens/ReceivedRequestsApproval";
import ReceivedRequestsPayment from "../screens/ReceivedRequestsPayment";
import ReceivedRequestsDropoff from "../screens/ReceivedRequestsDropoff";
import ReceivedRequestsRating from "../screens/ReceivedRequestsRating";
import SuccessPrompt from "../screens/SuccessPrompt";
import ErrorPrompt from "../screens/ErrorPrompt";
import CautionPrompt from "../screens/CautionPrompt";
import AccountSettings from '../screens/AccountSettings'
import EditProfile from '../screens/EditProfile'
import YourVehicles from '../screens/YourVehicles';
import EditVehicle from '../screens/EditVehicle';
import EditVehicleGeneral from '../screens/EditVehicleGeneral';
import EditVehicleDocs from '../screens/EditVehicleDocs';
import VehicleDocsGeneral from '../screens/VehicleDocsGeneral';
import AccountMenu from '../screens/AccountMenu';
import ChangePassword from '../screens/ChangePassword';
import Header1 from "./../shared/Header";
import React from "react";
import RegisterVehicle1 from "./../screens/RegisterVehicle1";
import RegisterVehicle2 from "./../screens/RegisterVehicle2";
import RegisterVehicle3 from "./../screens/RegisterVehicle3";
import RegisterVehicle4 from "./../screens/RegisterVehicle4";
import Wallet1 from "./../screens/Wallet1";
import Wallet2 from "./../screens/Wallet2";
import Wallet3 from "./../screens/Wallet3";


const signedin = {
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Register6: {
    screen: Register6,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Register5: {
    screen: Register5,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Welcome: {
    screen: Welcome,
    navigationOptions: {
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      headerShown: false,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp0: {
    screen: SignUp0,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp1: {
    screen: SignUp1,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register1: {
    screen: Register1,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Register2: {
    screen: Register2,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Register3: {
    screen: Register3,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Register4: {
    screen: Register4,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SignUp0: {
    screen: SignUp0,
    navigationOptions: {
      headerShown: false,
    },
  },
  SignUp1: {
    screen: SignUp1,
    navigationOptions: {
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  PickUpandDropOff: {
    screen: PickUpandDropOff,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SearchResults1: {
    screen: SearchResults1,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  CarDetails: {
    screen: CarDetails,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
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



  RequestSent: {
    screen: RequestSent,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },

  RentRequests: {
    screen: RentRequests,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequests: {
    screen: SentRequests,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsApproval: {
    screen: SentRequestsApproval,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsPayment: {
    screen: SentRequestsPayment,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsPayment2: {
    screen: SentRequestsPayment2,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsInprogress: {
    screen: SentRequestsInprogress,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsDropoff: {
    screen: SentRequestsDropoff,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SentRequestsRating: {
    screen: SentRequestsRating,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  SuccessPrompt: {
    screen: SuccessPrompt,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ErrorPrompt: {
    screen: ErrorPrompt,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  CautionPrompt: {
    screen: CautionPrompt,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ReceivedRequests: {
    screen: ReceivedRequests,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ReceivedRequestsApproval: {
    screen: ReceivedRequestsApproval,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ReceivedRequestsPayment: {
    screen: ReceivedRequestsPayment,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ReceivedRequestsDropoff: {
    screen: ReceivedRequestsDropoff,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  ReceivedRequestsRating: {
    screen: ReceivedRequestsRating,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  RegisterVehicle1: {
    screen: RegisterVehicle1,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  RegisterVehicle2: {
    screen: RegisterVehicle2,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  RegisterVehicle3: {
    screen: RegisterVehicle3,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  RegisterVehicle4: {
    screen: RegisterVehicle4,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Wallet1: {
    screen: Wallet1,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Wallet2: {
    screen: Wallet2,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
  Wallet3: {
    screen: Wallet3,
    navigationOptions: ({ navigation }) => {
      return {
        headerLeft: () => null,
        headerTitle: () => <Header1 navigation={navigation} />,
      };
    },
  },
};

const SignedIn = createStackNavigator(signedin, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#ffc107",
    },
  },
});

export default SignedIn;

// const AuthStack = createStackNavigator()

// export default createAppContainer(createSwitchNavigator({
//     SignedIn: SignedIn,
//     SignedOut: SignedOut,
// },{
//     initialRouteName: loginstatus ? "SignedIn" : "SignedOut"
// }))
