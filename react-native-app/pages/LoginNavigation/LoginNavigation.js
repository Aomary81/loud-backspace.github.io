import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Appearance } from "react-native";

import LoginScreen from './LoginScreen';
import AccountCreation from './AccountCreation'
import theme from '../../styles/theme.style'


const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: true,
            headerStyle: {
              backgroundColor: theme.BACKGROUND_COLOR,
            },
            headerShadowVisible: false,
            headerTintColor: Appearance.getColorScheme() === 'dark' ? '#B4B4B4' : 'black',
        }}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AccountCreation" component={AccountCreation}/>
    </Stack.Navigator>
  );
}

export default LoginNavigation;