import React, { useState, useEffect  } from "react";
import { View, Button, Text, StyleSheet, Platform} from "react-native";
import theme from '../../styles/theme.style'

import { useContext } from "react";
import { AuthContext } from "../../context";
import InputField from "../components/V2Components/InputField";
import { TouchableOpacity } from "react-native";
import * as SecureStore from 'expo-secure-store';
import Ionicons from "react-native-vector-icons/Ionicons";
import ScreenLayout from "../components/V2Components/ScreenLayout";
import InputArea from "../components/V2Components/InputArea";

const AccountInformation = () => {
  const { signIn, setToken } = useContext(AuthContext).authContext;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [listing, setListing] = useState("");
  const [desc, setDescription] = useState("");
  const [gender, setGender] = useState('');

  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const isWeb = Platform.OS === 'web';

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
    setGender('male');
	});
	//console.log(userData);
  }, []);

  const handleLogout = () => {
		if(!isWeb){
		  setToken(null);
		  deleteToken('userToken');
		  signIn(false);
		} else {
		  fetch('http://'+myIp+':3000/auth/logout', {
		  method: 'POST',
		  credentials: "include",
		  headers: {
			'Content-Type': 'application/json'
		  },
		  https: false, // Set the https option to true
		})
		  .catch(error => {
			console.error(error);
		});
		  setToken(null);
		  signIn(false);
		}
	  }
	  async function deleteToken(key) {
		await SecureStore.deleteItemAsync(key);
	  }

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
          gender: gender
        }),
      });
	  
      const result = await response.json();
      if (response.status == 200) {
        setError('');
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
          <Text style={{ color: "rgb(30, 144, 255)", fontSize: 20 }}>
            Your account was updated successfully.
            </Text>
            <TouchableOpacity style={[styles.button, {width: 300, marginTop: 15}]} onPress={() => setSuccess(false)} title="OK">
            <View>
              <Text style={{ color: "#fff", fontSize: 15, fontFamily: 'Roboto' }}>
                Return
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity
            onPress={handleLogout}
            style={{
              backgroundColor: '#FEDBDB',
              borderRadius: 5,
              height: 50,
              width: 150,
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: 8,
              right: 8
              }}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons name={"log-out-outline"} size={24} color={'#FF4747'} />
              <Text style={{color: '#28303F', fontSize: 18, fontFamily: 'Roboto', marginLeft: 8 }}>Sign Out</Text>
            </View>
        </TouchableOpacity>
        {/* Personal Details Container */}
        <View style={{ flexDirection: "column", fontFamily: 'Roboto' }}>
          <Text style={styles.header}>Account Details</Text>
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
            value={zipCode}
            onChangeText={zipCode}
            placeholder="ZIP Code"
          />
          {
            /*
            <InputField
            style={styles.input}
            value={null}
            onChangeText={null}
            placeholder="Date of Birth"
            />
            //*/
          }
          <InputField
            style = {styles.input}
            value = {desc}
            onChangeText={setDescription}
            placeholder="Bio"
          />
          <TouchableOpacity style={[styles.button, {width: '100%'}]} onPress={saveAccountInformation}>
            <View>
              <Text style={{ color: "#fff", fontSize: 15, fontFamily: 'Roboto' }}>
                Submit
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Login Credentials Container */}
        <View style={{ flexDirection: "column"}}>
          {/*
          <Text style={styles.headerMuted}>Change Password</Text>
          <InputField
            style={styles.inputMuted}
            value={""}
            //onChangeText={null}
            placeholder="Password (disabled)"
          />
          <InputField
            style={styles.inputMuted}
            value={""}
            //onChangeText={null}
            placeholder={"Confirm Password (disabled)"}
          />*/}
          <Text>{error}</Text>
        </View>
      </View>

      {/* Login Credentials Container */}
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.headerMuted}>Change Password</Text>
        <InputField
          style={styles.inputMuted}
          value={""}
          //onChangeText={null}
          placeholder="Password (disabled)"
        />
        <InputField
          style={styles.inputMuted}
          value={""}
          //onChangeText={null}
          placeholder={"Confirm Password (disabled)"}
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
        <Text>{error}</Text>
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
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
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
    fontFamily: 'Roboto'
  },
  input: {
    height: 50,
    width: 300,
    fontFamily: 'Roboto'
  },
  inputBox: {
	  flex: 1,
    width: 300,
    fontFamily: 'Roboto'
  },
  header: {
    fontSize: 25,
    color: "#333",
    marginBottom: 10,
    fontFamily: 'Roboto',
    color: theme.TEXT_COLOR
  },
  headerMuted: {
    fontSize:25,
    color: "#999",
    fontWeight: "600",
    marginBottom: 10,
    fontFamily: 'Roboto'
  },
  text: {
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: 'Roboto'
  },
  textMuted: {
    color: "#f9f9f9",
    fontFamily: 'Roboto'
  },
  inputMuted: {
    backgroundColor: "#f5f5f5",
    height: 50,
    width: 300,
    fontFamily: 'Roboto'
  },
});
