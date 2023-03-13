import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../context";
import InputField from "../components/V2Components/InputField";
import { TouchableOpacity } from "react-native";

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
      const response = await fetch("http://" + myIp + ":3000/update/user", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          token: token,
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setError("");
    setAddress("");
    setCity("");
    setState("");
    setZipCode("");
    setListing("");
  };
  if (success) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "limegreen" }}>
          Your changes were saved successfully!
        </Text>
        <Button onPress={() => setSuccess(false)} title="OK" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Personal Details Container */}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.header}>Personal Details</Text>
        <InputField
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />
        <InputField
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />
        <InputField value={email} onChangeText={setEmail} placeholder="Email" />
        <InputField
          style={{ backgroundColor: "#e5e5e5" }}
          value={undefined}
          onChangeText={undefined}
          placeholder="ZIP Code"
        />
        <InputField
          value={undefined}
          onChangeText={undefined}
          placeholder="Date of Birth"
        />
      </View>

      {/* Login Credentials Container */}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.headerMuted}>Change Password</Text>
        <InputField
          style={styles.inputMuted}
          value={undefined}
          onChangeText={undefined}
          placeholder="Password (disabled)"
        />
        <InputField
          style={styles.inputMuted}
          value={undefined}
          onChangeText={undefined}
          placeholder="Confirm Password (disabled)"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={saveAccountInformation}
        >
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
            Submit
          </Text>
        </TouchableOpacity>
        {error && <Text>{error}</Text>}
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
  button: {
    height: 35,
    width: "100%",
    backgroundColor: "dodgerblue",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 30,
    color: "#333",
    fontWeight: "600",
    marginBottom: 10,
  },
  headerMuted: {
    fontSize: 30,
    color: "#999",
    fontWeight: "600",
    marginBottom: 10,
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
  },
  textMuted: {
    color: "#f9f9f9",
  },
  inputMuted: {
    backgroundColor: "#f5f5f5",
  },
});
