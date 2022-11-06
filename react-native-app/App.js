import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
//import TestComponent from './pages/components\TestComponent';
import TestComponent from './pages/components/TestComponent';
import StandardStyles from './pages/components/StandardStyles';
import PageLayouts from './pages/components/PageLayouts';

const landscapeMenuBar = 250;

function contentSpaceWidth(){
	
	const screenWidth = useWindowDimensions().width;
	
	if(screenWidth > 800){
		return ((screenWidth - landscapeMenuBar));
	}
	else{
		return (screenWidth * 0.9);
	}
	
}

export default function App() {
	
	
	return (
		<View style={ PageLayouts.baseview}>
			<View style={ PageLayouts.topBar}>
			</View>
			<View style={ PageLayouts.contentSpace}>
				{//*
				(useWindowDimensions().width > 800) &&
				<View style={[ 
					PageLayouts.menuBar,
					{width: landscapeMenuBar}
				]}>
					<Text> Side Menu: </Text>
					<Text>only available when screen is large enough </Text>
				</View>
				//*/}
				}
				<View style={[
					PageLayouts.contentColumn, 
					{width: contentSpaceWidth()}
				]}>
					<Text> Test </Text>
				</View>
			</View>
		</View>
	);
}
