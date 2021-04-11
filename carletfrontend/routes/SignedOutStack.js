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
        navigationOptions: {
            headerShown: false,
        },
    },
    Register1: {
        screen: Register1,
        navigationOptions: {
            headerShown: true,
            title: "",
            headerStyle: {backgroundColor: "#ffc107"}
        }
    },
    Register2: {
        screen: Register2,
        navigationOptions: {
            headerShown: true,
            title: "",
            headerStyle: {backgroundColor: "#ffc107"}
        }
    },
    Register3: {
        screen: Register3,
        navigationOptions: {
            headerShown: true,
            title: "",
            headerStyle: {backgroundColor: "#ffc107"}
        }
    },
    Register4: {
        screen: Register4,
        navigationOptions: {
            headerShown: false,
        }
    },
    Register6: {
        screen: Register6,
        navigationOptions: {
            headerShown: false,
        },
    },
    Register5: {
        screen: Register5,
        navigationOptions: {
            headerShown: false,
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    PickUpandDropOff: {
        screen: PickUpandDropOff,
        navigationOptions: {
            headerShown: true,
            title: "",
            headerStyle: {backgroundColor: "#ffc107"}
        }
    },
    SearchResults1: {
        screen: SearchResults1,
        navigationOptions: {
            headerShown: false,
        }
    },
    
}




const SignedOut = createStackNavigator(signedout)

export default createAppContainer(SignedOut)


// const AuthStack = createStackNavigator()


// export default createAppContainer(createSwitchNavigator({
//     SignedIn: SignedIn,
//     SignedOut: SignedOut,
// },{
//     initialRouteName: loginstatus ? "SignedIn" : "SignedOut"
// }))

