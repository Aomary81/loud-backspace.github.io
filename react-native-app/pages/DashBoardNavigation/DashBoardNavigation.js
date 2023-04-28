import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashBoardScreen from './DashBoardScreen';
import ListingEdit from '../FinderNavigation/ListingEdit';


const Stack = createNativeStackNavigator();

function DashBoardNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="Dashboard Screen" component={DashBoardScreen} />
        <Stack.Screen name="ListingEdit" component={ListingEdit} />
    </Stack.Navigator>
  );
}

export default DashBoardNavigation;