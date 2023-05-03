import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import theme from "../../styles/theme.style";

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
  const [error, setError] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [listing, setListing] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState("");
  const [refresh, setRefresh] = useState(false);

  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);

  const [success, setSuccess] = useState(false);
  const isWeb = Platform.OS === "web";

  useEffect(() => {
    const userData = fetch(process.env.BACKEND_IP_PORT+"/get/user", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setEmail(data.email);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setZipCode(data.zip_code);
        setDescription(data.desc);
		console.log("Current description: "+ description);
        setGender(data.gender);
        checkGender(data.gender);
      });
    //console.log(userData);
  }, [refresh]);
  
  const checkGender = (gen) => {
    if (gen === "male") {
      setShowMale(true);
    }
    if (gen === "female") {
      setShowFemale(true);
    }
    if (gen === "non-binary") {
      setShowNonBinary(true);
    }
  };

  const handleLogout = () => {
    if (!isWeb) {
      setToken(null);
      deleteToken("userToken");
      signIn(false);
    } else {
      fetch(process.env.BACKEND_IP_PORT+"/auth/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        https: false, // Set the https option to true
      }).catch((error) => {
        console.error(error);
      });
      setToken(null);
      signIn(false);
    }
  };
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
      const response = await fetch(process.env.BACKEND_IP_PORT+"/update/user", {
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
		  zip_code: zipCode,
          desc: description,
          gender: gender,
        }),
      });

      const result = await response.json();
      if (response.status == 200) {
        setError("");
        setSuccess(true);
      } else {
        setError("Validation Failed: Please fix your "+result.message);
		console.log("Validation failed: " + JSON.stringify(await response));
      }

      //*/
    } catch (error) {
      setError("An error has occured!");
      console.log("An error has occured!\n"+error);
    }
	setRefresh(!refresh);
  };
  const [showMale, setShowMale] = useState(false);
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
      <ScreenLayout>
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
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: 'transparent',
          borderRadius: 8,
          height: 40,
          width: 150,
          paddingHorizontal: 8,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 8,
          right: 8,
          borderColor: 'red',
          borderWidth: 2,
          borderStyle: 'solid'
          }}>
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name={"log-out-outline"} size={24} color={'red'} />
          <Text style={{color: theme.TEXT_COLOR, fontSize: 18, fontFamily: 'Roboto', marginLeft: 8 }}>Sign Out</Text>
        </View>
      </TouchableOpacity>

        {/* Personal Details Container */}
        <View style={{ flexDirection: "column", fontFamily: 'Roboto', marginTop: 20}}>
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
            onChangeText={setZipCode}
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
          <InputArea
            multiline={true}
            numberOfLines={10}
            placeholder="Bio"
            value={""+description}
            onChangeText={setDescription}
            style={{
              height: 120,
              width: '100%',
              color: theme.TEXT_COLOR
            }}
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
          <Text style={styles.errortext}>{error}</Text>
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
            <Text style={{ color: theme.TEXT_COLOR, fontSize: 18 }}>
              {" "}
              Female
            </Text>
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
      </View>

      {/* Login Credentials Container
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
        </View>*/}
    </ScreenLayout>
  );
};

export default AccountInformation;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto'
  },
  container:{
    flex: 1,
    width: '100%',
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
    fontFamily: 'Roboto',
    color: theme.TEXT_COLOR
  },
  inputBox: {
	  flex: 1,
    width: 300,
    fontFamily: 'Roboto',
    height: 150,
    color: theme.TEXT_COLOR,
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
  
  errortext: {
    color: "#ff0000",
	fontSize: 25,
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
