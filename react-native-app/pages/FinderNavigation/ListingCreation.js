import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { AuthContext } from "../../context";
import theme from '../../styles/theme.style'
import InputField from '../components/V2Components/InputField'
import InputArea from '../components/V2Components/InputArea'

import ScreenLayout from "../components/V2Components/ScreenLayout";

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
  const [bed, setBed] = useState("");
  const [bath, setBath] = useState("");
  const [contact, setContact] = useState("");
  const [sucess, setSucess] = useState(false);

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
          contact: contact,
          bed: bed,
          bath: bath,
          token: token,
        }),
        https: false, // Set the https option to true
      });
      const result = await response.json();
      if (response.status == 200) {
        setSucess(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const clearInputs = () => {
    setStreetNumber("");
    setStreetName("");
    setApartmentNumber("");
    setCity("");
    setState("");
    setZipCode("");
    setRent("");
    setTags("");
    setBio("");
    setContact("");
    setBath("");
    setBed("");
  };

  if(sucess){
    return (
      <ScreenLayout>
        <Text style={{ color: "dodgerblue", paddingBottom: 10 }}>
          Your listing was created successfully!
        </Text>
        <Button onPress={() => {setSucess(false); navigation.goBack()}} title="OK" />
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <InputField
        placeholder="Street Number"
        value={streetNumber}
        onChangeText={setStreetNumber}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Street Name"
        value={streetName}
        onChangeText={setStreetName}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Apartment Number"
        value={apartmentNumber}
        onChangeText={setApartmentNumber}
        style={styles.TextInput}
      />
      <InputField
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.TextInput}
      />
      <InputField
        placeholder="State"
        value={state}
        onChangeText={setState}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Rent"
        value={rent}
        onChangeText={setRent}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Bedrooms"
        value={bed}
        onChangeText={setBed}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Bathrooms"
        value={bath}
        onChangeText={setBath}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Contact info"
        value={contact}
        onChangeText={setContact}
        style={styles.TextInput}
      />
      <InputField
        placeholder="Tags (comma-separated)"
        value={tags}
        onChangeText={setTags}
        style={styles.TextInput}
      />
      <InputArea
        multiline={true}
        numberOfLines={10}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        style={{
          height: 120,
          width: 600
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
    </ScreenLayout>
  );
};

export default ListingCreation;

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
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 10,
    fontSize: 15,
    color: theme.INPUT_TEXT_COLOR
  },
});
