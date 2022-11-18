import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

function DashBoardScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>DashBoardScreen</Text>
      </View>
    );
  }
  export default DashBoardScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ecba82',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });