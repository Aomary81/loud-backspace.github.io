import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph, TextInput } from "react-native-paper";
import PageLayouts from "@PageLayouts";
import RoommateCard from "../components/RoommateFinderComponents/RoommateCard";
import RoommateFinderUserBriefing from "../components/RoommateFinderComponents/RoommateFinderUserBriefing";
import { SafeAreaView } from "react-navigation";
import React, { useState, useContext } from 'react';
import InputField from "../components/V2Components/InputField";
import { AuthContext } from "../../context";
import Listing from "../../backend-express-app/models/listing.model";
import {ContentModule} from "../components/V2Components/ContentModule"

const Data = [
  { id: "1" },
  { id: "2" },
  { id: "3" },
  { id: "4" },
  { id: "5" },
  { id: "6" },
  { id: "7" },
  { id: "8" },
  { id: "9" },
  { id: "10" },
];


export default function FinderScreen({ navigation }) {

  const { myIp } = useContext(AuthContext).ip;
  const [zipCode, getZipCode] = useState('');
  const [pageNum, getPageNum] = useState('1');
  const [data, setData] = useState([]);
  const SearchListings = async () =>{

    try {
      const response = await fetch("http://" + myIp + ":3000/listings/search", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify({
          page_num: pageNum,
          zip_code: zipCode,
        }),

        https: false, // Set the https option to true
      });
      const result = await response.json();
      if (response.status == 200) {
        console.log(result.listing)
        setData(result.listing)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

    const handlePress = (item) => {
      console.log(`Clicked item ${item._id}`);
    };

  return (
    <SafeAreaView>

        <TextInput
          style={styles.TextInput}
    		  placeholder = 'Search By Zipcode'
    		  value = {zipCode}
    		  onChangeText = {getZipCode}
    		/>
      
   		  <Button 
          onPress={SearchListings} title = "Button"
        />
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ListingCreation")}
        >
          <Text>Create Listing</Text>
        </TouchableOpacity>{" "}
      </View>

        <RoommateFinderUserBriefing />

        <View style={styles.Box}>
          {data.map(item => (
        <TouchableOpacity
          style={styles.ContentModule}
          key={item._id}
          onPress={() => handlePress(item)}
        >
          <Text style={styles.text}>{`${item.city}, ${item.zip_code}`}</Text>
          <Text style={styles.text}>{item.street_name}</Text>
          <Text style={styles.text}>{item.rent}</Text>
        </TouchableOpacity>
           ))}
        </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 30,
    width: 300,
    marginBottom: 10,
  },
  button: {
    height: 20,
    width: 120,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  TextInput: {
    backgroundColor: "white",
    paddingLeft: 5,
    height: 40,
    width: 200,
    borderWidth: 1,
    marginBottom: 5,
    justifyContent: "right",
    alignItems: "right",
  },
  ContentModule: {
    alignItems: 'center',
    justifyContent: 'center',
		width: 200,
    height: 100,
    backgroundColor: '#E1E1E1',
    margin: 1,
    borderRadius: 10,
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  }
});
