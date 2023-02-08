import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

import RoommateCardTitle from './RoommateCardTitle';

export default function RoommateCard(){
	return(
		<View style={PageLayouts.pageContainer}>
			<Card style={{width: '95%', marginTop: 5, marginBottom: 5}}>
				<RoommateCardTitle
					img="https://picsum.photos/200"
					name="Joe Shmoe"
					city="Los Angeles, CA 75856"
				/>
				<Card.Content style={{textAlign: 'center', paddingTop: 8}}>
					<Text style={{fontWeight: 'bold'}}>--- User Preferences Here ---</Text>
				</Card.Content>
			</Card>
		</View>
	);
}
