import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button} from 'react-native';
import { AuthContext } from '../../context';
import React from "react";

function LoginScreen() {
  const { signIn } = React.useContext(AuthContext);
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text>Login Screen</Text>
        <Button
          title="Log In"
          onPress={() => signIn()}
        />
      </View>
    );
  }
  export default LoginScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ecba82',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });