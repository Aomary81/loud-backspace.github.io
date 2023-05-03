// import * as React from 'react';
// import { View, useWindowDimensions } from 'react-native';

// /**
// This function will create a first level set of views that will
// create a column of content located at the horizontal center of the page

// The ContentBaseColumn will function much like the traditional <View> component
// meaning that users can call it like follows in order to utilize it

// <ContentBaseColumn>
// 	<Text> Some Text </Text>
// 	<Text> Some more text below some text </Text>
// </ContentBaseColumn>

// If the user attaches a style to the ContentBaseColumn like follows:
// <ContentBaseColumn style={yourstyle.style}></ContentBaseColumn>
// The styles will be merged with the ContentBaseColumn

// */
// export default function ContentBaseColumn(props){
// 	const {height, width} = useWindowDimensions();
	
// 	return (
// 		<View style={
// 			Object.assign
// 			(
// 				{
// 					flexDirection: 'row',
// 					justifyContent: 'center',
// 					alignItems: 'center',
// 					overflow: 'hidden',
// 					height: '100%',
// 					width: '100%'
// 				}, 
// 				props.style
// 			)
// 		}>
// 			<View style={{
// 				flexDirection: 'column',
// 				justifyContent: 'flex-start',
// 				alignItems: 'center',
// 				overflow: 'hidden',
// 				width: '80%',
// 				height: '100%'
// 			}}>
// 				{props.children}
// 			</View>
// 		</View>
// 	);
// }