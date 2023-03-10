import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createTopButtonNavigator } from "./TopButtonNavigator";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  Platform,
  useWindowDimensions,
  SafeAreaView,
  Text,
} from "react-native";
import { useEffect, useState, useMemo } from "react";
import * as SecureStore from "expo-secure-store";

import { AuthContext } from "./context";

import DashBoardNavigation from "./pages/DashBoardNavigation/DashBoardNavigation";
import FinderNavigation from "./pages/FinderNavigation/FinderNavigation";
import ChatNavigation from "./pages/ChatNavigation/ChatNavigation";
import CalendarNavigation from "./pages/CalendarNavigation/CalendarNavigation";
import RemindersNavigation from "./pages/RemindersNavigation/RemindersNavigation";
import LoginNavigation from "./pages/LoginNavigation/LoginNavigation";
import AccountNavigation from "./pages/AccountNavigation/AccountNavigation";

const isWeb = Platform.OS === "web";
const Tab = createBottomTabNavigator();
const TopButton = createTopButtonNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  //Login state and token
  const [loginChecked, setLoginChecked] = useState(false);
  const [isLoggedIn, setLoginState] = useState(false);
  const [token, setUserToken] = useState(null);
  const ip = useMemo(() => {
    return {
      myIp: "192.168.1.34",
    };
  }, []);
  const authContext = useMemo(() => {
    return {
      signIn: (loggedIn) => {
        setLoginState(loggedIn);
      },
      setToken: (token) => {
        setUserToken(token);
      },
    };
  }, []);

  async function retrieveUserSession() {
    let result = await SecureStore.getItemAsync("userToken");
    if (result) {
      await fetch("http://" + ip.myIp + ":3000/auth/isLoggedIn", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: result,
        }),
        https: false, // Set the https option to true
      })
        .then((response) => response.json())
        .then((data) => (valid = data.isLoggedIn))
        .catch((error) => {
          console.error(error);
        });
      if (valid) {
        setUserToken(result);
        setLoginState(true);
      } else {
        deleteToken("userToken");
      }
    }
    setLoginChecked(true);
  }

  async function deleteToken(key) {
    await SecureStore.deleteItemAsync(key);
  }

  async function retrieveUserWebSession() {
    console.log("retriving session");
    await fetch("http://" + ip.myIp + ":3000/auth/isLoggedIn", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      https: false, // Set the https option to true
    })
      .then((response) => response.json())
      .then((data) => setLoginState(data.isLoggedIn))
      .catch((error) => {
        console.error(error);
      });
    setLoginChecked(true);
  }

  useEffect(() => {
    if (!isWeb) {
      retrieveUserSession();
    } else {
      retrieveUserWebSession();
    }
  }, []);
  /*----------------------*/
  const dimensions = useWindowDimensions();
  const homeIcon = {};

  if (!loginChecked) {
    return (
      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <AuthContext.Provider value={{ authContext, token, ip }}>
      <NavigationContainer>
        {isLoggedIn ? (
          !isWeb ? (
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "dodgerblue",
                tabBarInactiveTintColor: "#888",
                tabBarStyle: {
                  backgroundColor: "white",
                },
              }}
            >
              <Tab.Screen
                name="Dashboard"
                component={DashBoardNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "home" : "home-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Finder"
                component={FinderNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "search" : "search-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Chat"
                component={ChatNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={
                        focused
                          ? "chatbubble-ellipses"
                          : "chatbubble-ellipses-outline"
                      }
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Calendar"
                component={CalendarNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "calendar" : "calendar-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Reminders"
                component={RemindersNavigation}
                options={{
                  tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                      name={focused ? "checkbox" : "checkbox-outline"}
                      size={size}
                      color={color}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          ) : (
            <TopButton.Navigator>
              <TopButton.Screen
                name="Dashboard"
                component={DashBoardNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-home-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#AFD2FF',
                  offColor: '#DCEAFE'
                }}
              />
              <TopButton.Screen
                name="Roommate Finder"
                component={FinderNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-search-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#AFD2FF',
                  offColor: '#DCEAFE'
                }}
              />
              <TopButton.Screen
                name="Chat"
                component={ChatNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-chatbubbles-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#AFD2FF',
                  offColor: '#DCEAFE'
                }}
              />
              <TopButton.Screen
                name="Calendar"
                component={CalendarNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-calendar-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#AFD2FF',
                  offColor: '#DCEAFE'
                }}
              />
              <TopButton.Screen
                name="Reminders"
                component={RemindersNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-notifications-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#AFD2FF',
                  offColor: '#DCEAFE'
                }}
              />
              <TopButton.Screen
                name="Account"
                component={AccountNavigation}
                options={{
                  buttonIcon: ({ focused, size }) => (
                    <Ionicons
                      name="md-person-outline"
                      size={25}
                      color={focused ? "#333" : "#888"}
                    />
                  ),
                  onColor: '#FFAAAA',
                  offColor: '#FFDBDB',
                  end: true
                }}
              />
            </TopButton.Navigator>
          )
        ) : (
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Login" component={LoginNavigation} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
