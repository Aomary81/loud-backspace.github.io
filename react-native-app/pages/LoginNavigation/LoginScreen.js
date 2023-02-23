import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { AuthContext } from '../../context';
import { TouchableOpacity } from 'react-native';
import { useContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';

import InputField from '../components/V2Components/InputField'

const isWeb = Platform.OS === "web";

function LoginScreen({navigation}) {
  const { signIn, setToken } = useContext(AuthContext).authContext;
  const { myIp } = useContext(AuthContext).ip;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = () => {
    fetch('http://'+myIp+':3000/auth/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      email: email,
      password: password,
      isMobile: isWeb ? false : true
    }),
      https: false,
    })
      .then(response => response.json())
      .then(data => data.token ? setUserState(data.token) : null)
      .catch(error => {
        console.error(error);
    });
  };

  const setUserState = (token) => {
    if(!isWeb){
      save('userToken', token)
      setToken(token);
      signIn(true);
    }else{
      signIn(true);
    }
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <InputField
          style={styles.input}
          placeholder={'email'}
          value={email}
          onChangeText={setEmail}
        />
        <InputField
          style={styles.input}
          placeholder={'password'}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button}
          onPress={handleLogin}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}
          onPress={() => navigation.navigate('AccountCreation')}
        >
          <Text>Create Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
  export default LoginScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    input:{
      height: 30,
      width: 300,
      marginBottom: 10
    },
    button: {
      height: 20,
      width: 120,
      backgroundColor: 'dodgerblue',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5
    }
  });