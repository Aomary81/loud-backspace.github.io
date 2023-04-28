import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountCreation from "./AccountEditing";

const Stack = createNativeStackNavigator();

function AccountNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Account Screen" component={AccountCreation} />
    </Stack.Navigator>
  );
}

export default AccountNavigation;
