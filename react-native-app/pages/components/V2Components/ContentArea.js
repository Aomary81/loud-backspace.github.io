import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';

/**

The content area is a column of content that 

*/
export default function ContentArea(props){
	const {height, width} = useWindowDimensions();
	
	return (
		<View style={
			Object.assign
			(
				{
					flex: 1,
					flexDirection: 'Column',
					justifyContent: 'center',
					alignItems: 'center',
					alignSelf: 'stretch',
					justifySelf: 'stretch',
					overflow: 'hidden',
					width: '100%'
				}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);
}