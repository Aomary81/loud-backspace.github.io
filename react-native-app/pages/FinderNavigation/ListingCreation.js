import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { AuthContext } from "../../context";

const ListingCreation = ({ navigation }) => {
  const { myIp } = useContext(AuthContext).ip;
  const { token } = useContext(AuthContext);
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [rent, setRent] = useState("");
  const [tags, setTags] = useState("");
  const [bio, setBio] = useState("");

  const [originalStreetNumber, setOriginalStreetNumber] = useState("");
  const [originalStreetName, setOriginalStreetName] = useState("");
  const [originalApartmentNumber, setOriginalApartmentNumber] = useState("");
  const [originalcity, setOriginalCity] = useState("");
  const [originalstate, setOriginalState] = useState("");
  const [originalzipCode, setOriginalZipCode] = useState("");
  const [originalRent, setOriginalRent] = useState("");
  const [originalTags, setOriginalTags] = useState("");
  const [originalBio, setOriginalBio] = useState("");

  const SubmitListing = async () => {
    try {
      const response = await fetch("http://" + myIp + ":3000/listings/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          street_number: streetNumber,
          street_name: streetName,
          apartment_number: apartmentNumber,
          city: city,
          state: state,
          zip_code: zipCode,
          rent: rent,
          tags: tags,
          bio: bio,
          token: token,
        }),
        https: false, // Set the https option to true
      });
      const result = await response.json();
      if (response.status == 200) {
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearInputs = () => {
    setStreetNumber(setOriginalStreetNumber);
    setStreetName(setOriginalStreetName);
    setApartmentNumber(setOriginalApartmentNumber);
    setCity(setOriginalCity);
    setState(setOriginalState);
    setZipCode(setOriginalZipCode);
    setRent(setOriginalRent);
    setTags(setOriginalTags);
    setBio(setOriginalBio);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Create Listing</Text>
      </TouchableOpacity>{" "}
      <TextInput
        placeholder="Street Number"
        value={streetNumber}
        onChangeText={setStreetNumber}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Street Name"
        value={streetName}
        onChangeText={setStreetName}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Apartment Number"
        value={apartmentNumber}
        onChangeText={setApartmentNumber}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Rent"
        value={rent}
        onChangeText={setRent}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
        style={styles.TextInput}
      />
      <TextInput
        multiline={true}
        numberOfLines={10}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={{
          backgroundColor: "white",
          paddingLeft: 5,
          height: 120,
          width: 600,
          borderWidth: 1,
          paddingTop: 0,
        }}
      />
      <View style={{ height: 10 }} />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Button title="Clear" onPress={clearInputs} />
        <View style={{ height: 40, width: 40 }} />
        <Button onPress={SubmitListing} title="Submit" />
      </View>
    </View>
  );
};

export default ListingCreation;

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
    marginBottom: 10,
  },
});
