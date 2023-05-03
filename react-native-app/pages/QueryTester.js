import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, { useState, useEffect, useContext  } from "react";
import { AuthContext } from "../context";

function QueryTester(props) {
	

	const { myIp } = useContext(AuthContext).ip;
	const { token } = useContext(AuthContext);

	const [success, setSuccess] = useState(false);
	const [resultText, setResultText] = useState("ERROR");
	
	
	const endpoint = props.endpoint
	const api_address = process.env.BACKEND_IP_PORT+""+endpoint
	
	useEffect(() => { 
		
	const merged_object = Object.assign({}, { token: token, }, props.payloadJSON);
		try{
				
			const userData = fetch(api_address, {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(merged_object),
			})
			.then(response => {
				console.log(response);
				return(response.json());
			})
			.then(data => {
				
				console.log("Successfully loaded test data from "+api_address)
				console.log(data);
				setResultText(JSON.stringify(data));
				setSuccess(true);
				
				
				
			});
		} catch (error){
			
			
			setResultText("ERROR");
			setSuccess(false);
		}
		
	}, []);
	return(
		<View>
			<Text style={success? styles.ResultStyle :styles.FailStyle}>
			{"Results for:\n\t" + props.description + "\nUsing Address\n\t" +api_address + "\n----\n\n"+ resultText + "\n\n----\nResults End\nConsensus\n\t" + (success ? "Test Responded" : "Test Failed")}
			</Text>
		</View>
	);
}

export default QueryTester;

const styles = StyleSheet.create({
	ResultStyle:{
		flex: 1,
		width: '100%',
		borderRadius: 10,
		borderWidth: 5,
		borderColor: 'gold',
		flexWrap: 'wrap',
	},
	
	FailStyle:{
		flex: 1,
		width: '100%',
		borderRadius: 10,
		borderWidth: 5,
		borderColor: 'red',
		flexWrap: 'wrap',
	}
});