import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, { useState, useEffect, useContext  } from "react";
import { AuthContext } from "../../context";

import theme from '../../styles/theme.style';
import QueryTester from '../QueryTester';


function ChatScreen() {
	

	const { myIp } = useContext(AuthContext).ip;
	const { token } = useContext(AuthContext);

	const [success, setSuccess] = useState(false);
	
	//API testers should be done as a component to preserve token integrity
	
	useEffect(() => { 
		
	}, []);
	
	
	return (
		<SafeAreaView style={styles.background}>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<Text>{"\n\nHousehold Info Tests\n\n"}</Text>
				<QueryTester 
					description = "Get the signed in users household info" 
					endpoint = "/household/get-household" 
				/>
				<QueryTester 
					description = "Get the roommate list of the signed in user"
					endpoint = "/get/roommates"
				/>
				
				<Text>{"\n\nUser Info Tests\n\n"}</Text>
				<QueryTester
					description = "Get the info of the signed in user"
					endpoint = "/get/user"
				/>
				<QueryTester
					description = "Get the user info of user with _id 640e8041e7fc5b8072e23e31 expecting omary@yahoo.com"
					endpoint = "/get/userById/idinBody"
					payloadJSON = {{userID: "640e8041e7fc5b8072e23e31"
					}}
				/>
				
				<Text>{"\n\nReminders Info Tests\n\n"}</Text>
				<QueryTester 
					description = "Get the signed in users reminder list"
					endpoint = "/reminders/my_reminders"
				/>
				
			</View>
		</SafeAreaView>
	);
}
export default ChatScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: "white",
		alignItems: 'center',
		//justifyContent: 'center'
	},
	container:{
		flex: 1,
		width: '100%',
		//alignItems: 'center',
		//justifyContent: 'center'
	}
});