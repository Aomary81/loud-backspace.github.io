import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

import ContentArea from '../components/V2Components/ContentArea';

function DashBoardScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Dashboard View</Text>
		<ContentArea>
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