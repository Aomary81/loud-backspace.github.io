import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet} from 'react-native';

function ChatScreen() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>ChatScreen</Text>
      </View>
    );
  }
  export default ChatScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ecba82',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });