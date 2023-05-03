import { Text, View, Image } from 'react-native';
import { Title } from 'react-native-paper';
import theme from '../../../styles/theme.style';

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
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'flex-start',
			padding: 10
			}}>
			{
			<Image
				style={{height: 38, width: 38}}
				source={{uri: ""+props.img}}
			/>
			}
			<View style={{marginLeft: 15}}>
				<Title style={{fontWeight: 'bold', fontSize: 21, margin: 0, color: theme.TEXT_COLOR, fontFamily: 'Roboto'}}>
				{props.title}
				</Title>
				<Text style={{color: theme.TEXT_COLOR, fontFamily: 'Roboto'}}>
				{props.description}
				</Text>
			</View>
		</View>
	);
	
}
