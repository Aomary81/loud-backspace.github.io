import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';
import RoommateCard from './components/RoommateFinderComponents/RoommateCard';
import RoommateFinderUserBriefing from './components/RoommateFinderComponents/RoommateFinderUserBriefing';

export default function RoommateFinder(){
	
	return(
	
		<View style={ PageLayouts.mainContentSpace}>
			
			<RoommateFinderUserBriefing/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			<RoommateCard/>
			
		</View>
		
	);
	
}

