import * as React from 'react';
import {View} from 'react-native';

/**
Tile system, content goes into ContentModule and ContentModules are placed in this view as tiles.
When using specify height and width props, and you can add styles for top, bottom, left and right
 to place the TileView.

//*/
export default function TileView(props){
	return (
		<View style={
			Object.assign
			(
				{
					flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
					width: props.width,
                    height: props.height,
                    borderRadius: 12,
                    backgroundColor: '#F3F3F3',
                    margin: 10
				}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);
}