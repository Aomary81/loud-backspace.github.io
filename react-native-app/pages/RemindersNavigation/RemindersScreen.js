import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

function RemindersScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>RemindersScreen</Text>
      </View>
    );
  }
  export default RemindersScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ecba82',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });