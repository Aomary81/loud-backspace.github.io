import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardScreen from './DashBoardScreen';


const Stack = createNativeStackNavigator();

function DashBoardNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
    </Stack.Navigator>
  );
}

export default DashBoardNavigation;