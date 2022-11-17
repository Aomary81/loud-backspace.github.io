import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

import RoommateCardTitle from './RoommateCardTitle';

export default function RoommateCard(){
	
	return(
	
		<View style={ PageLayouts.mainContentItem}>
			<Card style={{width: '100%', height: 100}}>
				{
				//*
				<RoommateCardTitle 
				img="https://picsum.photos/200"
				name="Placeholder Roommate Name"
				city="Someplace, California"/>
				//*/
				}
				<Card.Content >
					<Text>(User Tags Go Here)</Text>
				</Card.Content>
			</Card>
		</View>
		
	);
	
}

