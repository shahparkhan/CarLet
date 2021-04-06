import { createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Welcome from './../screens/Welcome'
import Login from './../screens/Login'
import SignUp0 from './../screens/SignUp0'
import SignUp1 from './../screens/SignUp1'


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
    
}

const HomeStack = createStackNavigator(screens)

export default createAppContainer(HomeStack)