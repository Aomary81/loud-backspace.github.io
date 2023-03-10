import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet, Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from '../../context';

const isWeb = Platform.OS === "web";

const AccountCreation = () => {
  const { signIn, setToken } = useContext(AuthContext).authContext;
  const { myIp } = useContext(AuthContext).ip;

  const handleSignup = () => {
    fetch('http://'+myIp+':3000/auth/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
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
      isMobile: isWeb ? false : true
    }),
      https: false // Set the https option to true
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

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [originalfirstName, setOriginalFirstName] = useState("");
  const [originallastName, setOriginalLastName] = useState("");
  const [originalemail, setOriginalEmail] = useState("");
  const [originalpassword, setOriginalPassword] = useState("");
  const [originalerror, setOriginalError] = useState(null);
  const [originaladdress, setOriginalAddress] = useState("");
  const [originalcity, setOriginalCity] = useState("");
  const [originalstate, setOriginalState] = useState("");
  const [originalzipCode, setOriginalZipCode] = useState("");

  const saveAccountInformation = () => {
    if (!email.includes("@")) {
      setError("Email is invalid");
      return;
    }
    if(firstName == null || firstName == ''){
      setError('Must have first name')
      return;
    }
    if(lastName == null || lastName == ''){
      setError('Must have last name')
      return;
    }
    if(email == null || email == ''){
      setError('Must have email')
      return;
    }
    if(password == null || password == ''){
      setError('Must have password')
      return;
    }
    handleSignup();
  }

    // Add more validation checks

    const clearInputs = () => {
      setFirstName(originalfirstName);
      setLastName(originallastName);
      setEmail(originalemail);
      setPassword(originalpassword);
      setError(originalerror);
      setAddress(originaladdress);
      setCity(originalcity);
      setState(originalstate);
      setZipCode(originalzipCode);
    };

    return (
      <View style={styles.container}>
        <TextInput
          value={firstName}
          onChangeText={setFirstName}
          style={styles.TextInput}
          placeholder="First Name"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={lastName}
          onChangeText={setLastName}
          style={styles.TextInput}
          placeholder="Last Name"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.TextInput}
          placeholder="Email"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.TextInput}
          placeholder="Password"
          secureTextEntry
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={address}
          onChangeText={setAddress}
          style={styles.TextInput}
          placeholder="Address"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={city}
          onChangeText={setCity}
          style={styles.TextInput}
          placeholder="City"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={state}
          onChangeText={setState}
          style={styles.TextInput}
          placeholder="State"
        />
        <View style={{ height: 10 }} />
        <TextInput
          value={zipCode}
          onChangeText={setZipCode}
          style={styles.TextInput}
          placeholder="ZipCode"
        />
        <View style={{ height: 10 }} />
        {error && <Text>{error}</Text>}
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Button title="Clear" onPress={clearInputs} />
          <View style={{ height: 40, width: 40 }} />
          <Button onPress={saveAccountInformation} title="Save" />
        </View>
      </View>
    );
}
export default AccountCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    backgroundColor: "white",
    paddingLeft: 5,
    height: 40,
    width: 200,
    borderWidth: 1,
  },
});
