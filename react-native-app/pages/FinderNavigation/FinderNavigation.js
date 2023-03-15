import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FinderScreen from "./FinderScreen";
import ListingCreation from "./ListingCreation";
import ListingEdit from "./ListingEdit";
import UserListings from "./UserListings";

const Stack = createNativeStackNavigator();

function FinderNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FinderScreen" component={FinderScreen} />
      <Stack.Screen name="ListingCreation" component={ListingCreation} />
      <Stack.Screen name="ListingEdit" component={ListingEdit} />
      <Stack.Screen name="My Listings" component={UserListings} />
    </Stack.Navigator>
  );
}

export default FinderNavigation;
