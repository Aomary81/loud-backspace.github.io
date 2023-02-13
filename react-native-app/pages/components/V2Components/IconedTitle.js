import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions, Image } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import PageLayouts from '@PageLayouts';

/**

The Iconed Title is derived from the former Roommate Card title
The reasoning for this is that the roommate card title effectly
had all of the elements desired for the iconed title so modifyig
the existing code was more time efficient

props:
img = image url
title = title text
description = title description

*/
export default function IconedTitle(props){
	
	return(
		<View style={{
			flex: 1,
			flexDirection: 'row',
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
				{props.title}
				</Title>
				<Text>
				{props.description}
				</Text>
			</View>
		</View>
	);
	
}
