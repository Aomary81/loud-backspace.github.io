import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';

/**

The content area is a wrapped row of content that 

*/
export default function ContentAreaHeaderBar(props){
	const {height, width} = useWindowDimensions();
	
	return (
		<View style={
			Object.assign
			(
				{
					flexDirection: 'Row',
					justifyContent: 'space-between',
					alignItems: 'center',
					alignSelf: 'stretch',
					overflow: 'hidden',
					backgroundColor: 'yellow',
					width: '100%',
					height: 60
				}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);
}