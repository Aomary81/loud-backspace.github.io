import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';

/**
The Content Logo Block contains its content in a left justified view that
spans its parent container width 100%

//*/
export default function ContentLogoBlock(props){
	
	return (
		<View style={
			Object.assign
			(
				{
					flexDirection: 'row',
					justifyContent: 'flex-start',
					alignItems: 'flex-end',
					width: '100%'
				}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);


}