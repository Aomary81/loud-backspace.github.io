import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FinderScreen from "./FinderScreen";
import ListingCreation from "./ListingCreation";

const Stack = createNativeStackNavigator();

function FinderNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen name="FinderScreen" component={FinderScreen} />

      <Stack.Screen name="ListingCreation" component={ListingCreation} />
    </Stack.Navigator>
  );
}

export default FinderNavigation;
