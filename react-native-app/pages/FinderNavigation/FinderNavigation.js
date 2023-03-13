import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FinderScreen from "./FinderScreen";
import ListingCreation from "./ListingCreation";
import ListingEdit from "./ListingEdit";

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
      <Stack.Screen name="ListingEdit" component={ListingEdit} />
    </Stack.Navigator>
  );
}

export default FinderNavigation;
