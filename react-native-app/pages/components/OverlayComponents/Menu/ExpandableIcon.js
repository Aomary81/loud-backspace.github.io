// //Basic React Native Stuff
// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';

// //Vector Icons
// import Icon from 'react-native-vector-icons/Ionicons';

// //Importing standard stylesheet
// import PageLayouts from '@PageLayouts';

// /*
// ExpandableIcon

// Intended for use in the sidebar
// <ExpandableIcon icon="example" label="example text" color='#33ddff'/>

// */
// export default function ExpandableIcon(props){
// 	let textColor = props.color;
// 	return(
// 		<View style={PageLayouts.userIconTitle}>
// 			{
// 				(props.side == 'left') && (props.icon) &&
// 				<Icon name={props.icon} size={30} color={props.color}/>
// 			}
// 			{
// 				(props.width > 190) &&
// 				<Text  style={{fontSize:16, color: textColor}}> {props.label} </Text>
// 			}
// 			{
// 				(props.side == 'right') && (props.icon) &&
// 				<Icon name={props.icon} size={30} color={props.color}/>
// 			}
// 		</View>
// 	)
// }