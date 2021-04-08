import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Welcome from './../screens/Welcome'
import Login from './../screens/Login'
import SignUp0 from './../screens/SignUp0'
import SignUp1 from './../screens/SignUp1'
import Register from './../screens/Register'
import Register1 from './../screens/Register1'
import Register2 from './../screens/Register2'
import Register3 from './../screens/Register3'
import Register4 from './../screens/Register4'


const screens = {
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
            headerShown: true,
            title: "",
            headerStyle: {backgroundColor: "#ffc107"}
        }
    }
    
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)