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
        <View style={styles.card}>
          <Text style={styles.header}>Sign In</Text>
          <StatusBar style="auto" />
          <InputField
            style={styles.input}
            placeholder={'Email'}
            value={email}
            onChangeText={setEmail}
          />
          <InputField
            style={styles.input}
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
          />
          <View style={{display: 'flex', flexDirection: 'column', marginTop: 5, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.button}
              onPress={handleLogin}
            >
              <Text style={styles.text}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AccountCreation')}
            >
              <Text style={{color: '#222', fontSize: 15, marginTop: 5, fontWeight: '600'}}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
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
      height: 50,
      width: 300,
      marginBottom: 10
    },
    button: {
      height: 35,
      width: '100%',
      backgroundColor: 'dodgerblue',
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 5,
      paddingVertical: 10,
      paddingHorizontal: 15
    },
    text: {
      color: '#ffffff',
      fontWeight: '600'
    },
    header: {
      fontSize: 30,
      color: '#111111',
      fontWeight: '600',
      marginBottom: 15
    },
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f3f3',
      borderRadius: 8,
      paddingVertical: 25,
      paddingHorizontal: 35
    }
  });