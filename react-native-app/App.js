//Basic React Native Stuff
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

//Menu Stuff
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

//Vector Icons
import Icon from 'react-native-vector-icons/Ionicons';

//Importing project pages/tabs/content
import RoommateFinder from './pages/RoommateFinder';
import ContentArea from './pages/components/ContentArea';
import ExpandableIcon from './pages/components/OverlayComponents/Menu/ExpandableIcon';

//Importing standard stylesheet
import PageLayouts from '@PageLayouts';

function DashboardScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Dashboard Screen</Text>
			}
		/>
	);
}

function ProfileScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Profile Screen</Text>
			}
		/>
	);
}

function CalendarScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Calendar Screen</Text>
			}
		/>
	);
}

function ChatScreen(){
	return(
		<ContentArea
			content={
				<Text>TODO Chat Screen</Text>
			}
		/>
	);
}

function RoommateFinderScreen(){
	return(
		<ContentArea content={<RoommateFinder/>}/>
	);
}

function RemindersScreen(){
	return(
		<ContentArea content={
			<Text>TODO Reminder Screen</Text>
		}/>
	);
}

const Drawer = createDrawerNavigator();

export default function App() {
	//either have the sidebar width be 70 or 200
	let sidebarWidth = 200;
	
	return (
		<NavigationContainer>
			<Drawer.Navigator 
				initialRouteName="Dashboard"
				screenOptions={{
					drawerStyle: {
						width: sidebarWidth
					},
				}}
			>
				<Drawer.Screen 
					name="Dashboard"
					component={DashboardScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="home"
								label="Dashboard"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="My Profile"
					component={ProfileScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="person"
								label="My Profile"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Roommate Finder"
					component={RoommateFinderScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="search"
								label="Roommate Finder"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Chat"
					component={ChatScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="chatbubbles-outline"
								label="Chat"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Calendar"
					component={CalendarScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="calendar-sharp"
								label="Calendar"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
				<Drawer.Screen 
					name="Reminders Screen" 
					component={RemindersScreen}
					options={{
						drawerLabel: "",
						drawerIcon: ({color}) => (
							<ExpandableIcon
								icon="checkbox-outline"
								label="Reminders"
								side="left"
								width={sidebarWidth}
								color={color}
							/>
						)
					}}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
}
