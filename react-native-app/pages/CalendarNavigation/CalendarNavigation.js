import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CalendarScreen from './CalendarScreen';


const Stack = createNativeStackNavigator();

function CalendarNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
}

export default CalendarNavigation;