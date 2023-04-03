import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, { useState, useEffect, useContext  } from "react";
import { AuthContext } from "../../context";

import theme from '../../styles/theme.style'

function ChatScreen() {
	

	const { myIp } = useContext(AuthContext).ip;
	const { token } = useContext(AuthContext);

	const [success, setSuccess] = useState(false);

	useEffect(() => { 
		const endpoint = "/household/get-household"
		const api_address = "http://" + myIp + ":3000"+endpoint
		const userData = fetch(api_address, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		})
		.then(response => {
			console.log(response);
			return(response.json());
		})
		.then(data => {
			
			console.log("Successfully loaded test data from "+api_address)
			console.log(data);
		});
		
		const endpoint2 = "/get/userById/idinBody"
		const api_address2 = "http://" + myIp + ":3000"+endpoint2
		console.log("Attempting to get data from " + api_address2);
		const userData2 = fetch(api_address2, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
				userID: "640e8041e7fc5b8072e23e31"
			}),
		})
		.then(response => {
			console.log(response);
			return(response.json());
		})
		.then(data => {
			
			console.log("Successfully loaded test data from "+api_address)
			console.log(data);
		});
		
		const endpoint3 = "/get/roommates"
		const api_address3 = "http://" + myIp + ":3000"+endpoint3
		console.log("Attempting to get data from " + api_address3);
		const userData3 = fetch(api_address3, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		})
		.then(response => {
			console.log(response);
			return(response.json());
		})
		.then(data => {
			
			console.log("Successfully loaded test data from "+api_address)
			console.log(data);
		});
		
		
		const endpoint4 = "/reminders/my_reminders"
		const api_address4 = "http://" + myIp + ":3000"+endpoint4
		console.log("Attempting to get data from " + api_address4);
		const userData4 = fetch(api_address4, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: token,
			}),
		})
		.then(response => {
			console.log(response);
			return(response.json());
		})
		.then(data => {
			
			console.log("Successfully loaded test data from "+api_address)
			console.log(data);
		});
	}, []);
	
	return (
		<SafeAreaView style={styles.background}>
			<StatusBar style="auto" />
			<View style={styles.container}>
				<Text>ChatScreen</Text>
			</View>
		</SafeAreaView>
	);
}
export default ChatScreen;

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: theme.BACKGROUND_COLOR,
		alignItems: 'center',
		justifyContent: 'center'
	},
	container:{
		flex: 1,
		width: '100%',
		backgroundColor: theme.CONTAINER_COLOR,
		borderRadius: 10,
		borderWidth: 5,
		borderColor: theme.CONTAINER_COLOR,
		alignItems: 'center',
		justifyContent: 'center'
	}
});