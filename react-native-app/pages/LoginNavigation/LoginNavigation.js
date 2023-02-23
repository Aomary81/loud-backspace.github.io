import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';
import AccountCreation from './AccountCreation'


const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: true
        }}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AccountCreation" component={AccountCreation}/>
    </Stack.Navigator>
  );
}

export default LoginNavigation;