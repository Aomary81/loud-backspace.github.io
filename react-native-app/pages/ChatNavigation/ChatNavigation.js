import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from './ChatScreen';


const Stack = createNativeStackNavigator();

function ChatNavigation() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
    >
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default ChatNavigation;