import React, { useState, useEffect  } from "react";
import { View, Button, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import theme from '../../styles/theme.style'

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
  const [desc, setDescription] = useState("");

  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);

  useEffect(() => { 
	const userData = fetch("http://" + myIp + ":3000/get/user", {
		method: "POST",
		credentials: "include",
		headers: {
		  "Content-Type": "application/json",
		},
		body: JSON.stringify({
		  token: token,
		}),
	})
	.then(response => response.json())
    .then(data => {
		setFirstName(data.first_name);
		setLastName(data.last_name);
		setEmail(data.email);
		setAddress(data.address);
		setCity(data.city);
		setState(data.state);
		setZipCode(data.zip_code);
		setDescription(data.desc);
	});
	console.log(userData);
  }, []);


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
		  desc: desc,
        }),
      });
	  
      const result = await response.json();
      if (response.status == 200) {
        //setError('');
        setSuccess(true);
      } else {
        setError('Validation Failed!')
      }
	  
	  
	  
	  //*/
	  
    } catch (error) {
      setError('An error has occured!');
      console.log(error);
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
      <SafeAreaView style={styles.background}>
        <StatusBar/>
        <View style={styles.container}>
          <Text style={{ color: "limegreen" }}>
            Your changes were saved successfully!
          </Text>
          <Button onPress={() => setSuccess(false)} title="OK" />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        {/* Personal Details Container */}
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.header}>Personal Details</Text>
          <InputField
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />
          <InputField
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
          />
          <InputField
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email" />
          <InputField
            style={styles.input}
            value={undefined}
            onChangeText={undefined}
            placeholder="ZIP Code"
          />
          <InputField
            style={styles.input}
            value={undefined}
            onChangeText={undefined}
            placeholder="Date of Birth"
          />
		  <InputField
			style = {styles.inputBox}
			value = {desc}
			onChangeText={setDescription}
			placeholder="Type some stuff about yourself here..."
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
			<View>
				<Text style={{ color: "#fff", fontSize: 15, fontWeight: "600" }}>
				  Submit
				</Text>
			</View>
          </TouchableOpacity>
          {error && <Text>{error}</Text>}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AccountInformation;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
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
  input: {
    height: 50,
    width: 300
  },
  inputBox: {
	flex: 1,
    width: 300
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
    height: 50,
    width: 300
  },
});
