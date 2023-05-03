import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { AuthContext } from '../../context';
import { TouchableOpacity } from 'react-native';
import { useContext, useState} from "react";
import * as SecureStore from 'expo-secure-store';

import InputField from '../components/V2Components/InputField'
import theme from '../../styles/theme.style'
import {Image, Appearance, useWindowDimensions} from 'react-native';
const isWeb = Platform.OS === "web";

function LoginScreen({navigation}) {
  const { signIn, setToken } = useContext(AuthContext).authContext;

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ error, setError ] = useState('');
  const [ incorrectEmail, setIncorrectEmail] = useState(false);
  const [ incorrectPassword, setIncorrectPassword] = useState(false);
  const resetErrors = () => {
    setIncorrectEmail(false);
    setIncorrectPassword(false);
    setError('');
  }

  const {height, width, aspectRatio} = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const logo = colorScheme === 'dark' ?
  require('../../assets/logo/logo_dark.png') :
  require('../../assets/logo/logo_light.png');

  const handleLogin = async () => {
    try {
      const res = await fetch(process.env.BACKEND_IP_PORT+'/auth/login', {
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
        https: process.env.HTTP,
      });
      const data = await res.json();
      if(res.status == 200){
        setUserState(data.token);
      } else if(res.status == 400){
        setError('Invalid entry!');
      } else if(res.status == 401){
        if(data.message == 'User not found'){
          setError('Email does not exist!');
          setIncorrectEmail(true);
        } else if(data.message == 'Incorrect password'){
          setError('Incorrect Password');
          setIncorrectPassword(true);
        }
      }
    } catch (error){
      console.error(error);
    }
  };

  const setUserState = (token) => {
    if(!isWeb){
      save('userToken', token)
      setToken(token);
      signIn(true);
    }else{
      setToken(token);
      signIn(true);
    }
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  return (
      <View style={styles.container}>
        <View style={styles.error}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <View style={[styles.card, {justifyContent: 'center', alignItems: 'center'}]}>
          <View style={{ width: '100%', justifyContent: 'center', textAlign: 'left', alignItems: 'center'}}>
          <Image
            style={{height: 50, aspectRatio: 6800/1308, resizeMode: 'stretch', marginBottom: 15}}
            source={logo}
          />
          </View>
          <StatusBar style="auto" />
          <InputField
            style={styles.input}
            placeholder={'Email'}
            value={email}
            onChangeText={setEmail}
            borderColor={incorrectEmail ? 'red' : null}
            onFocus={resetErrors}
          />
          <InputField
            style={styles.input}
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            borderColor={incorrectPassword ? 'red' : null}
            onFocus={resetErrors}
            secureTextEntry={true}
          />
          <View style={{display: 'flex', flexDirection: 'column', marginTop: 5, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.text}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Create Account')}>
              <Text style={{color: theme.TEXT_COLOR, fontSize: 15, marginTop: 5, fontFamily: 'Inter'}}>Create Account</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%'}}>
            <Text style={{color:theme.TEXT_COLOR, fontSize: 12, fontFamily: 'Inter', marginTop: 10, textAlign: 'left'}}>By continuing, you accept and agree to our <Text style={{color: 'dodgerblue'}}>Terms of {"\n"}Service</Text> and <Text style={{color: 'dodgerblue'}}>Privacy Policy.</Text></Text>
          </View>
        </View>
      </View>
    );
  }
  export default LoginScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: theme.CONTAINER_COLOR,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Roboto'
    },
    font: {
      fontFamily: 'Inter'
    },
    input:{
      height: 50,
      width: 300,
      color: theme.TEXT_COLOR,
      fontFamily: 'Inter',
      backgroundColor: theme.CONTAINER_COLOR
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
      paddingHorizontal: 15,
      fontFamily: 'Inter'
    },
    text: {
      color: '#ffffff',
      fontFamily: 'Inter'
    },
    header: {
      fontSize: 30,
      color: '#111111',
      marginBottom: 15,
      fontFamily: 'Lato'
    },
    card: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.CONTENT_MODULE_COLOR,
      borderRadius: 8,
      paddingVertical: 25,
      paddingHorizontal: 35,
      fontFamily: 'Inter',
      height: 'auto'
    },
    error: {
      height: 20,
      fontFamily: 'Inter'
    },
    errorText: {
      color: 'red',
      fontFamily: 'Inter'
    }
  });