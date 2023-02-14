import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';
import AppButton from '../components/V2Components/AppButton';

function DashBoardScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Dashboard View</Text>
		<ContentArea>
			<ContentAreaHeaderBar>
				<IconedTitle 
					img="https://i.imgflip.com/5wkj5m.png"
					title="Dashboard"
					description="Uhhhhh, dashboard stuff..."
				/>
				<Text> [Middle Content] </Text>
				<Text> [End content] </Text>
			</ContentAreaHeaderBar>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
		</ContentArea>
      </View>
    );
  }
  export default DashBoardScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });