import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, FlatList } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';
import RoommateCard from '../components/RoommateFinderComponents/RoommateCard';
import RoommateFinderUserBriefing from '../components/RoommateFinderComponents/RoommateFinderUserBriefing';
import { SafeAreaView } from 'react-navigation';

const Data = [
	{id: '1'},{id: '2'},{id: '3'},{id: '4'},{id: '5'},
	{id: '6'},{id: '7'},{id: '8'},{id: '9'},{id: '10'},
	
]

export default function FinderScreen(){
	
	return(
	
		<SafeAreaView>
			
			<RoommateFinderUserBriefing/>
			<FlatList
				keyExtractor={(item) => item.id}
				data = {Data}
				renderItem={({item}) => (<RoommateCard/>)}
			/>
			
		</SafeAreaView>
		
	);
	
}

