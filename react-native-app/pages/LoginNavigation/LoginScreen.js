import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button} from 'react-native';
import { AuthContext } from '../../context';
import { TouchableOpacity } from 'react-native';
import React from "react";

function LoginScreen() {
  const { signIn } = React.useContext(AuthContext);
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={styles.text}>Login</Text>
        <TouchableOpacity onPress={() => signIn()}>
          <Text style={styles.button}>Click Here</Text>
        </TouchableOpacity>
      </View>
    );
  }
  export default LoginScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'rgb(217, 217, 217)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text:{
      fontSize: 30,
      marginBottom: 20,
    },
    button:{
      fontSize: 20,
      marginBottom: 20,
      backgroundColor: 'deepskyblue',
      color: 'white',
      padding: 15,
      borderRadius: 12
    }
  });