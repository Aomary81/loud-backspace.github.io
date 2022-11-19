import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

function DashBoardScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Dashboard View</Text>
      </View>
    );
  }
  export default DashBoardScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'rgb(217, 217, 217)',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });