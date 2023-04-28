import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { AuthContext } from "../../context";
import theme from '../../styles/theme.style'
import InputField from '../components/V2Components/InputField'
import InputArea from '../components/V2Components/InputArea'
import { TouchableOpacity } from 'react-native';

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

  const isLandscape = width > 700
  const {width} = useWindowDimensions();

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
        <Text style={{ color: 'deepskyblue', marginBottom: 10, fontFamily: 'Roboto', fontSize: 18 }}>
          Your listing was successfully posted!
        </Text>
        <TouchableOpacity 
        onPress={() => {setSucess(false); navigation.goBack()}}
        style={{
                backgroundColor: 'dodgerblue',
                borderRadius: 50,
                marginLeft: 5,
                width: 200,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center'
          }}>
          <Text style={{fontSize: 15, fontFamily: 'Inter', color: 'white'}}>Finish</Text>
        </TouchableOpacity>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout>
      <View style={{marginTop: 50, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: theme.TEXT_COLOR, fontSize: 30, marginBottom: 8, fontFamily: 'Roboto'}}>Create New Listing</Text>
        {/* Column 1 (Street Number, Street Name, Apartment Number, City, State, ZIP) */}
        <View style={{display: 'flex', flexDirection: isLandscape ? 'column' : 'row', justifyContent: 'center'}}>
          <View style={{display: 'flex', flexDirection: 'column', marginRight: 10}}>
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

          </View>
          <View style={{display: 'flex', flexDirection: 'column'}}>
            <InputField
              placeholder="Rent ($/month)"
              value={rent}
              onChangeText={setRent}
              style={styles.TextInput}
            />
            <InputField
              placeholder="# of Bedrooms"
              value={bed}
              onChangeText={setBed}
              style={styles.TextInput}
            />
            <InputField
              placeholder="# of Bathrooms"
              value={bath}
              onChangeText={setBath}
              style={styles.TextInput}
            />
            <InputField
              placeholder="Contact Info"
              value={contact}
              onChangeText={setContact}
              style={styles.TextInput}
            />
            <InputField
              placeholder="ZIP Code"
              value={zipCode}
              onChangeText={setZipCode}
              style={styles.TextInput}
            />
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <InputField
              placeholder="Tags (comma-separated)"
              value={tags}
              onChangeText={setTags}
              style={styles.Tags}
            />
          <InputArea
              multiline={true}
              numberOfLines={10}
              placeholder="Bio"
              value={bio}
              onChangeText={setBio}
              style={{
                height: 120,
                width: '100%',
                color: theme.TEXT_COLOR
              }}
            />
        </View>
      </View>
      <View style={{ marginTop: 5, display: 'flex', flexDirection: "column", width: 'auto', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={SubmitListing}>
          <Text style={{color: 'white', fontFamily: 'Inter'}}>Submit Listing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop: 5}} onPress={clearInputs}>
          <Text style={{color: theme.TEXT_COLOR, fontFamily: 'Inter'}}>Clear</Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
};

export default ListingCreation;

const styles = StyleSheet.create({
  button: {
    height: 35,
    width: 250,
    backgroundColor: 'dodgerblue',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'Roboto',
    color: 'white'
  },
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: 22,
    fontFamily: 'Roboto',
    marginBottom: 10,
    color: theme.TEXT_COLOR
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
    height: 55,
    width: 250,
    marginBottom: 10,
    color: theme.INPUT_TEXT_COLOR
  },
  Tags: {
    height: 55,
    width: '100%',
    marginBottom: 10,
    color: theme.INPUT_TEXT_COLOR
  },
});
