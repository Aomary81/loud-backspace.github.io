import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import { useContext } from 'react';
import { AuthContext } from '../../context';


const AccountInformation = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [listing, setListing] = useState("");
  const [originalfirstName, setOriginalFirstName] = useState("");
  const [originallastName, setOriginalLastName] = useState("");
  const [originalemail, setOriginalEmail] = useState("");
  const [originalpassword, setOriginalPassword] = useState("");
  const [originalerror, setOriginalError] = useState(null);
  const [originaladdress, setOriginalAddress] = useState("");
  const [originalcity, setOriginalCity] = useState("");
  const [originalstate, setOriginalState] = useState("");
  const [originalzipCode, setOriginalZipCode] = useState("");
  const [originalListing, setOriginalListing] = useState("");

  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  const saveAccountInformation = async () => {
    if (!email.includes("@")) {
      setError("Email is invalid");
      return;
    }

    // Add more validation checks

    try {
      const response = await fetch(`http://${myIp}:3000/update/user`, {
        method: "PATCH",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          token: token
        }),
      });
      const result = await response.json();
      if (response.status == 200) {
        setSuccess(true);
      }
    } catch (error) {

      setError(error.message);
    }
  };

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
    setListing(originalListing);
  };
  if (success) {
    return (
      <View style={styles.container}>
        <Text style={{color: 'limegreen'}}>
          Your changes were saved successfully!
        </Text>
        <Button onPress={() => setSuccess(false)}  title="OK"/>
      </View>
    );
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
};

export default AccountInformation;

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
