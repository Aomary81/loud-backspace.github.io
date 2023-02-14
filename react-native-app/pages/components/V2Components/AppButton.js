import * as React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function AppButton(props){
	
	return (
		<View style={
			Object.assign
			(
			{
			title, 
 			onPress, 
  			buttonColor, 
  			titleColor, 
  			buttonStyle, 
  			textStyle,
			}, 
				props.style
			)
		}>
			{props.children}
		</View>
	);


}