import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FinderScreen from './FinderScreen';


const Stack = createNativeStackNavigator();

function FinderNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="FinderScreen" component={FinderScreen} />
    </Stack.Navigator>
  );
}

export default FinderNavigation;