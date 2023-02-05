import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

export default function RoommateCardTitle(props){
	
	return(
		<View style={{
			flexDirection: 'row',
			width: '98%',
			alignItems: 'center',
			justifyContent: 'flex-start',
			padding: 10
			}}>
			{
			<Image
				style={{height: 55, width: 55, borderRadius: 50, padding: 10}}
				source={{uri: ""+props.img}}
			/>
			}
			<View style={{marginLeft: 10}}>
				<Title style={{fontWeight: 'bold', fontSize: 21, margin: 0}}>
				{props.name}
				</Title>
				<Text>
				{props.city}
				</Text>
			</View>
		</View>
	);
	
}
