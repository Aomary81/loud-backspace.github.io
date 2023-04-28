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
      <Stack.Screen name="Roommate Finder Screen" component={FinderScreen} />
      <Stack.Screen name="Create Listing Screen" component={ListingCreation} />
      <Stack.Screen name="Edit Listing Screen" component={ListingEdit} />
      <Stack.Screen name="My Listings Screen" component={UserListings} />
    </Stack.Navigator>
  );
}

export default FinderNavigation;
