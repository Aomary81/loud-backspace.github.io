//Importing third party libraries
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import PageLayouts from '@PageLayouts';

const landscapeMenuBar = 250;

function contentSpaceWidth(){
	
	const screenWidth = useWindowDimensions().width;
	
	{
		/*
		if(screenWidth > 800){
			return ((screenWidth - landscapeMenuBar)-15);
		}
		else{
			return (screenWidth * 0.9);
		}
		
		//*/
	}
	
	return screenWidth-20
	
}

/*
Content Area

Syntax: <ContentArea content={<OtherContent/>}/>

*/

export default function ContentArea(props){
	return(
		<View style={ PageLayouts.baseview}>
			{
			/*
			<View style={ PageLayouts.topBar}>
			</View>
			//*/
			}
			<View style={ PageLayouts.contentSpace}>
				{
					/*
					(useWindowDimensions().width > 800) &&
					<View style={[ 
						PageLayouts.menuBar,
						{width: landscapeMenuBar}
					]}>
						<Text> Side Menu: </Text>
						<Text>only available when screen is large enough </Text>
					</View>
					//*/
				}
				<View style={[
					PageLayouts.contentColumn, 
					{width: contentSpaceWidth()}
				]}>
					{props.content}
				</View>
			</View>
		</View>
	);
}
