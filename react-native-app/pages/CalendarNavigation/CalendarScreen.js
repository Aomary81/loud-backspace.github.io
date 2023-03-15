import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView} from 'react-native';
import theme from '../../styles/theme.style'

function CalendarScreen() {
    return (
      <SafeAreaView style={styles.background}>
        <StatusBar style="auto" />
        <View style={styles.container}>
          <Text>Calendar Screen</Text>
        </View>
      </SafeAreaView>
    );
  }
  export default CalendarScreen;

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