import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

export default function RoommateCardTitle(props){
	
	return(
		<View style={PageLayouts.userIconTitle}>
			{//*
			<Image
				style={PageLayouts.userIconSmall}
				source={require(""+props.img)}
			/>
			//*/
			}
			<View style={PageLayouts.userIconTitleTextStack}>
				<Title>
				{props.name}
				</Title>
				<Text>
				{props.city}
				</Text>
			</View>
		</View>
	);
	
}
