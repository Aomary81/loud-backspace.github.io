import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RemindersScreen from './RemindersScreen';


const Stack = createNativeStackNavigator();

function RemindersNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="RemindersScreen" component={RemindersScreen} />
    </Stack.Navigator>
  );
}

export default RemindersNavigation;