import React, { useState, useContext } from "react";
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import theme from "../../styles/theme.style";
import InputField from "../components/V2Components/InputField";

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
        isMobile: isWeb ? false : true,
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
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [gender, setGender] = useState("male");

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

  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(false);
  const [showNonBinary, setShowNonBinary] = useState(false);

  const toggleShowMale = () => {
    if (showMale) {
      setShowMale(false);
    } else {
      setShowMale(true);
      setShowFemale(false);
      setShowNonBinary(false);
      setGender("male");
    }
  };

  const toggleShowFemale = () => {
    if (showFemale) {
      setShowFemale(false);
    } else {
      setShowFemale(true);
      setShowMale(false);
      setShowNonBinary(false);
      setGender("female");
    }
  };

  const toggleNonBinary = () => {
    if (showNonBinary) {
      setShowNonBinary(false);
    } else {
      setShowNonBinary(true);
      setShowMale(false);
      setShowFemale(false);
      setGender("non-binary");
    }
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
        placeholder="ZipCode"
      />
      <View
        style={{
          flexDirection: "column",
          height: 60,
          width: 200,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              height: 16,
              width: 16,
              backgroundColor: showMale ? "black" : "white",
              borderRadius: 16,
              marginRight: 1,
              borderWidth: 2,
            }}
            onPress={() => toggleShowMale()}
          />
          <Text style={{ color: theme.TEXT_COLOR, fontSize: 18 }}> Male</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              height: 16,
              width: 16,
              backgroundColor: showFemale ? "black" : "white",
              borderRadius: 16,
              marginRight: 1,
              borderWidth: 2,
            }}
            onPress={() => toggleShowFemale()}
          />
          <Text style={{ color: theme.TEXT_COLOR, fontSize: 18 }}> Female</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <TouchableOpacity
            style={{
              height: 16,
              width: 16,
              backgroundColor: showNonBinary ? "black" : "white",
              borderRadius: 16,
              marginRight: 1,
              borderWidth: 2,
            }}
            onPress={() => toggleNonBinary()}
          />
          <Text style={{ color: theme.TEXT_COLOR, fontSize: 18 }}>
            {" "}
            Non-Binary
          </Text>
        </View>
      </View>
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
export default AccountCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 40,
    width: 200,
  },
});
