import React, { useState, useContext } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import theme from '../../styles/theme.style'
import InputField from '../components/V2Components/InputField'
import { TouchableOpacity } from "react-native-gesture-handler";

import { AuthContext } from "../../context";

const isWeb = Platform.OS === "web";

const AccountCreation = () => {
  const { signIn, setToken } = useContext(AuthContext).authContext;
  const { myIp } = useContext(AuthContext).ip;

  const handleSignup = () => {
    fetch("http://" + myIp + ":3000/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        address: address,
        city: city,
        state: state,
        zip_code: zipCode,
        gender: gender,
        isMobile: isWeb ? false : true
      }),
      https: false, // Set the https option to true
    })
      .then((response) => response.json())
      .then((data) => (data.token ? setUserState(data.token) : null))
      .catch((error) => {
        console.error(error);
      });
  };

  const setUserState = (token) => {
    if (!isWeb) {
      save("userToken", token);
      setToken(token);
      signIn(true);
    } else {
      signIn(true);
    }
  };

  async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gender, setGender] = useState('male');

  const saveAccountInformation = () => {
    if (!email.includes("@")) {
      setError("Email is invalid");
      return;
    }
    if (firstName == null || firstName == "") {
      setError("Must have first name");
      return;
    }
    if (lastName == null || lastName == "") {
      setError("Must have last name");
      return;
    }
    if (email == null || email == "") {
      setError("Must have email");
      return;
    }
    if (password == null || password == "") {
      setError("Must have password");
      return;
    }
    handleSignup();
  };

  // Add more validation checks

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 25, fontWeight: '600', marginBottom: 10, color: theme.TEXT_COLOR, fontFamily: 'Roboto'}}>
        Create an Account
      </Text>
      <InputField
        value={firstName}
        onChangeText={setFirstName}
        style={styles.TextInput}
        placeholder="First Name"
      />
      <InputField
        value={lastName}
        onChangeText={setLastName}
        style={styles.TextInput}
        placeholder="Last Name"
      />
      <InputField
        value={email}
        onChangeText={setEmail}
        style={styles.TextInput}
        placeholder="Email"
      />
      <InputField
        value={password}
        onChangeText={setPassword}
        style={styles.TextInput}
        placeholder="Password"
        secureTextEntry
      />
      <InputField
        value={address}
        onChangeText={setAddress}
        style={styles.TextInput}
        placeholder="Address"
      />
      <InputField
        value={city}
        onChangeText={setCity}
        style={styles.TextInput}
        placeholder="City"
      />
      <InputField
        value={state}
        onChangeText={setState}
        style={styles.TextInput}
        placeholder="State"
      />
      <InputField
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.TextInput}
        placeholder="ZIP Code"
      />
      {error && <Text style={{color: 'red', fontSize: 16, fontFamily: 'Inter'}}>{error}</Text>}
      <View style={{display: 'flex', flexDirection: 'column', marginTop: 5, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={saveAccountInformation}>
          <Text style={[styles.text, {color: '#fff', fontSize: 15, fontFamily: 'Inter'}]}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={clearInputs}>
          <Text style={{color: theme.TEXT_COLOR, fontSize: 15, marginTop: 5, fontFamily: 'Inter'}}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AccountCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
    textAlign: 'left',
    fontFamily: 'Roboto'
  },
  TextInput: {
    height: 55,
    width: 250,
    color: theme.TEXT_COLOR
  },
  leftAlign: {
    display: 'flex'
  },
  button: {
    height: 40,
    width: 250,
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  text: {
    color: theme.TEXT_COLOR,
  },
});
