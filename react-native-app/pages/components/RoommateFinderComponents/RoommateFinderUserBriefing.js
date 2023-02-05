import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

export default function RoommateFinderUserBriefing(){
	
	return(
	
		<View style={PageLayouts.descriptionContainer}>
			<Title style={PageLayouts.pageTitle}>Roommate Finder</Title>
			<Paragraph style={PageLayouts.pageDescription}>
				Find roommates according to your budget, preferences, interests, and more.
			</Paragraph>
		</View>
		
	);
	
}
