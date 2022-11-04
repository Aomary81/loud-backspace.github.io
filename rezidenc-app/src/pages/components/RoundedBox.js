import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import StandardStyles from './StandardStyles.js';

const RoundedBox = (content) => {
	
	return(
	
		<View style={StandardStyles.container}>
			<View>{content}!</View>
		</View>
	);
	
}

export default RoundedBox;
