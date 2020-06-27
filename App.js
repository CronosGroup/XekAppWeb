import React, {Component}  from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import  HomeScreen  from './src/view/screens/home/HomeScreen';
import { Vibration, Platform } from 'react-native';
//import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import MapScreen from "./src/view/screens/map/MapScreen";
import ResultsScreen from "./src/view/screens/results/ResultsScreen";
import PhoneScreen from "./src/view/screens/phone/PhoneScreen";
import WelcomeScreen from "./src/view/screens/welcome/WelcomeScreen";
import LoginScreen from "./src/view/screens/login/LoginScreen";
import CodeScreen from "./src/view/screens/code/CodeScreen";
import EmailScreen from "./src/view/screens/email/EmailScreen";
import RecoverPhoneScreen from "./src/view/screens/recover/phone/RecoverPhoneScreen";
import RecoverCodeScreen from "./src/view/screens/recover/code/RecoverCodeScreen";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PlaceHolderScreen from './src/view/screens/PlaceHolderScreen'
import CountrySelector from "./src/view/components/phone/CountrySelector";
import FaqWebScreen from "./src/view/screens/web/FaqWebScreen";

const Stack = createStackNavigator();

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
    .then(result => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
    .catch(console.warn); // it's good to explicitly catch and inspect any error

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expoPushToken: '',
            notification: {},
            fontsLoaded: false,
        };
    }

    /*registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            try {
                let token = await Notifications.getExpoPushTokenAsync();
                console.log("token="+token);
                this.setState({ expoPushToken: token });
            } catch (error) {
            }
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
           await Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            });
        }
    };*/

   async componentDidMount() {
        await Font.loadAsync({
            'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
            'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf')
        }).then(value => {
            this.setState({fontsLoaded: true})
            SplashScreen.hideAsync()
        })

       /*await this.registerForPushNotificationsAsync()

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification)*/
    }

   /* _handleNotification = notification => {
        Vibration.vibrate();
        console.log(notification);
        this.setState({ notification: notification });
    }*/

    render() {
        if( !this.state.fontsLoaded ) {
            return <PlaceHolderScreen/>
        }
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={welcomeOptions}/>
                    <Stack.Screen name="Login" component={LoginScreen} options={loginOptions}/>
                    <Stack.Screen name="Home" component={HomeScreen} options={homeOptions}/>
                    <Stack.Screen name="Phone" component={PhoneScreen} options={phoneOptions}/>
                    <Stack.Screen name="Code" component={CodeScreen} options={codeOptions}/>
                    <Stack.Screen name="Email" component={EmailScreen} options={emailOptions}/>
                    <Stack.Screen name="Results" component={ResultsScreen} options={resultsOptions}/>
                    <Stack.Screen name="Map" component={MapScreen} options={mapOptions}/>
                    <Stack.Screen name="RecoverPhone" component={RecoverPhoneScreen} options={recoverPhoneOptions}/>
                    <Stack.Screen name="RecoverCode" component={RecoverCodeScreen} options={recoverCodeOptions}/>
                    <Stack.Screen name="CountrySelector" component={CountrySelector} options={countrySelectorOptions}/>
                    <Stack.Screen name="FaqWeb" component={FaqWebScreen} options={faqWebOptions}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

const faqWebOptions = {
    title: 'Faq',
    headerShown: false,
    gestureEnabled: false,
}

const welcomeOptions = {
    title: 'Welcome',
    headerShown: false,
    gestureEnabled: false,
}

const loginOptions = {
    title: 'Login',
    headerShown: false,
    gestureEnabled: false,
}

const homeOptions = {
    title: 'Home',
    headerShown: false,
    gestureEnabled: false,
}

const phoneOptions = {
    title: 'Phone registration',
    headerShown: false,
    gestureEnabled: false,
}

const codeOptions = {
    title: 'Code',
    headerShown: false,
    gestureEnabled: false,
}

const emailOptions = {
    title: 'Email',
    headerShown: false,
    gestureEnabled: false,
}

const resultsOptions = {
    title: 'Results',
    headerShown: false,
    gestureEnabled: false,
}

const mapOptions = {
    title: 'Map',
    headerShown: false,
    gestureEnabled: false,
}

const recoverPhoneOptions = {
    title: 'Phone',
    headerShown: false,
    gestureEnabled: false,
}

const recoverCodeOptions = {
    title: 'Code',
    headerShown: false,
    gestureEnabled: false,
}

const countrySelectorOptions = {
    title: 'CountrySelector',
    headerShown: false,
    gestureEnabled: false,
}

export default App;


