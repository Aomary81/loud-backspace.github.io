import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './LoginScreen';


const Stack = createNativeStackNavigator();

function LoginNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default LoginNavigation;