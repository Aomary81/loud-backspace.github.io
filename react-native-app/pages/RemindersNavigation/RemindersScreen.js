import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import theme from '../../styles/theme.style'

function RemindersScreen() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Text>Reminders View</Text>
        </View>
      </SafeAreaView>
    );
  }
  export default RemindersScreen;

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: theme.BACKGROUND_COLOR,
      alignItems: 'center',
      justifyContent: 'center'
    },
    container:{
      flex: 1,
      width: '100%',
      backgroundColor: theme.CONTAINER_COLOR,
      borderRadius: 10,
      borderWidth: 5,
      borderColor: theme.CONTAINER_COLOR,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });