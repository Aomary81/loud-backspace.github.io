import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { useState, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';

import { AuthContext } from '../../context';
import { SafeAreaView } from 'react-navigation';
import InputField from '../components/V2Components/InputField';
import { TouchableOpacity } from 'react-native';
import theme from '../../styles/theme.style'
import ListingPopup from '../components/V2Components/ListingPopup';
import Ionicons from "react-native-vector-icons/Ionicons";

const isWeb = Platform.OS === "web";

function DashBoardScreen() {
  const { token } = useContext(AuthContext);
  const { myIp } = useContext(AuthContext).ip;
  const [myListings, setListings] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [household, setHousehold] = useState();
  const [createPressed, setCreatePressed] = useState(false);
  const [householdName, setHouseholdName] = useState("");
  const [members, setMembers] = useState([]);
	const [addCode, setAddCode] = useState('');
	const [inputAddCode, setInputAddCode] = useState('');
	const [addSuccess, setAddSuccess] = useState(false);
	const [addPressed, setAddPressed] = useState(false);
  const [myReminders, setReminders] = useState([]);
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleListingPress = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  const toggleCreatePressed = () => {
    if (createPressed) {
      setCreatePressed(false);
    } else {
      setCreatePressed(true);
    }
  };

	const toggleAddPressed = () => {
		if(addPressed){
			setAddPressed(false);
		} else {
			setAddPressed(true);
		}
	};

  useFocusEffect(
    useCallback(() => {
      const getListings = async () => {
        try {
          const res = await fetch(
            "http://" + myIp + ":3000/listings/my_listings",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
              https: false,
            }
          );
          const data = await res.json();
          if (res.status == 200) {
            await setListings(data.my_listings);
          } else {
            console.log("Error occured getting listings");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getListings();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const getHousehold = async () => {
        try {
          const res = await fetch(
            "http://" + myIp + ":3000/household/get-household",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
              https: false,
            }
          );
          const data = await res.json();
          if (res.status == 200) {
            await setHousehold(data.household);
            await setMembers(data.members);
          } else {
            console.log("Error occured getting household");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getHousehold();
    }, [addSuccess])
  );

  useFocusEffect(
    useCallback(() => {
      const getReminders = async () => {
        try {
          const res = await fetch(
            "http://" + myIp + ":3000/reminders/my_reminders",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token: token,
              }),
              https: false,
            }
          );
          const data = await res.json();
          if (res.status == 200) {
            await setReminders(data.reminders);
          } else {
            console.log("Error occured getting reminders");
          }
        } catch (error) {
          console.log(error);
        }
      };
      getReminders();
    }, [addSuccess])
  );

	const SubmitHousehold = async () => {
		try {
		  const response = await fetch("http://" + myIp + ":3000/household/create", {
			method: "POST",
			credentials: "include",
			headers: {
			  "Content-Type": "application/json",
			},
	
			body: JSON.stringify({
			  name: householdName,
			  token: token,
			}),
			https: false, // Set the https option to true
		  });
		  const data = await response.json();
		  if (response.status == 200) {
			await setHousehold(data.household);
			await setMembers(data.members);
		  }
		} catch (error) {
		  console.log(error.message);
		}
	};

  const getAddCode = async () => {
  try {
    const response = await fetch("http://" + myIp + ":3000/household/invite", {
      method: "POST",
      credentials: "include",
      headers: {
      "Content-Type": "application/json",
      },
  
      body: JSON.stringify({
      token: token,
      }),
      https: false, // Set the https option to true
    });
    const data = await response.json();
    if (response.status == 200) {
      await setAddCode(data.addCode);
    }
    } catch (error) {
      console.log(error.message);
    }
  };

	const joinHousehold = async () => {
		try {
			const response = await fetch("http://" + myIp + ":3000/household/add", {
			  method: "POST",
			  credentials: "include",
			  headers: {
				"Content-Type": "application/json",
			  },
	  
			  body: JSON.stringify({
				addCode: inputAddCode.replace(/-/g,'').toLowerCase(),
				token: token,
			  }),
			  https: false, // Set the https option to true
			});
			const data = await response.json();
			if (response.status == 200) {
			  await setAddSuccess(data.success);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

    return (
      <SafeAreaView style={styles.background}>
      <StatusBar style="auto" />
        <View style={[styles.container, {borderRadius: 20}]}>
          <ContentArea style={{display: 'flex', flexDirection: 'column'}}>
            <ContentAreaHeaderBar>
              <IconedTitle 
                img="https://cdn-icons-png.flaticon.com/512/1828/1828740.png"
                title="Dashboard"
                description="View recent account activity"
              />
            </ContentAreaHeaderBar>
            <View style={{flex: 1, flexDirection: 'row', padding: 5, width: '100%', height: '100%'}}>
              <View style={styles.rowItem}>
                <Text style={styles.title}>Your Listings</Text>
                <ScrollView style={styles.tile}>
                  {myListings ? <View style={styles.Box}>
                            {myListings.map((item) => (
                    <TouchableOpacity
                    style={styles.ContentModule}
                    key={item._id}
                    onPress={() => handleListingPress(item)}
                    >
                    <View style={{flexDirection: 'row', width: '100%', height: '67%', marginBottom: 5,}}>
                      <View style={styles.images}>
                        <Text>?</Text>
                      </View>
                      <View style={{alignItems: 'flex-start'}}>
                      <Text style={[styles.text]}>{`${item.city}, ${item.zip_code}`}</Text>
                      <Text style={[styles.text]}>{item.street_name}</Text>
                      <Text style={[styles.text]}>${item.rent}/month</Text>
                      </View>
                    </View>
                    <Text 
                      style={[styles.text,
                      {fontSize: 12,
                      }]}>
                        Last updated: {
                              Math.floor((Date.now() - Date.parse(item.updatedAt)) / (1000*60*60*24))
                              } days ago
                    </Text>
                    </TouchableOpacity>))}
                    </View> :
                  <View>
                    <Text style={styles.text}>Loading...</Text>
                  </View>
                  }
                </ScrollView>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.title}>Your Roommates</Text>
                  <ScrollView style={styles.tile}>
                  {household ? <View style={styles.Box}>
                            {members && members.map((item) => (
                    <TouchableOpacity
                      style={styles.ContentModule}
                      key={item._id}
                        >
                      <Text>{item.first_name} {item.last_name}</Text>
                      
                    </TouchableOpacity>
                            ))}
                    {!addCode ? <TouchableOpacity
                      onPress={() => getAddCode()}
                      style={[styles.ContentModule,{
                        minHeight: 100,
                        alignItems: 'center',
                        justifyContent: 'center'}]}>
                            <Ionicons
                              name={"add-circle-outline"}
                              size={35}
                              color={theme.TEXT_COLOR}
                            />
                            <Text style={[styles.text,{fontWeight: 500, fontSize: 20, marginTop: 5}]}>
                              Invite Members
                            </Text>
                    </TouchableOpacity> :
                    <View
                      style={[styles.ContentModule,{
                        minHeight: 100,
                        alignItems: 'center',
                        justifyContent: 'center'}]}>
                      <Text style={[styles.text, {fontSize: 22, letterSpacing: 1.5}, {
                        }]}>
                        {addCode.toUpperCase().slice(0,2)}-
                        {addCode.toUpperCase().slice(2,4)}-
                        {addCode.toUpperCase().slice(4,6)}-
                        {addCode.toUpperCase().slice(6,8)}
                      </Text>
                      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
                        <Ionicons name={"time-outline"} size={15} color={theme.TEXT_COLOR} style={{marginTop: 2}} />
                        <Text> Code valid for 24 hours</Text>
                      </View>
                    </View>}
                  </View> :
                  <View style={[styles.tile ,{
                    alignItems: 'center',
                    width: "100%"}]}>
                    <TouchableOpacity
                    style={{
                      backgroundColor: theme.CONTENT_MODULE_COLOR,
                      width: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'}}
                      onPress={() => toggleCreatePressed()}>
                      <Text style={[styles.text,{
                        paddingVertical: 20,
                        fontWeight: 'bold',
                        fontSize: 16,
                        fontFamily: 'Roboto',
                      }]}>
                        Create Household
                      </Text>
                      {createPressed && 
                      <View style={{height: 100, alignItems: 'center'}}>
                        <InputField
                              value={householdName}
                              onChangeText={setHouseholdName}
                              style={styles.TextInput}
                              placeholder="Household Name"
                        />
                        <TouchableOpacity style={{
                          height: 40,
                          width: 200,
                          backgroundColor: 'dodgerblue',
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center'}}
                          onPress={() => SubmitHousehold()}>
                            <Text style={[styles.text, {color: 'white', fontFamily: 'Inter'}]}>Create Household</Text>
                        </TouchableOpacity>
                      </View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{
                      backgroundColor: theme.CONTENT_MODULE_COLOR,
                      width: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 8.8}}
                      onPress={() => toggleAddPressed()}>
                      <Text style={[styles.text,{
                        paddingVertical: 20,
                        fontWeight: 'bold',
                        fontSize: 16,
                        fontFamily: 'Roboto'
                      }]}>
                        Join Household
                      </Text>
                      {addPressed && <View
                      style={{height: 100, alignItems: 'center'}}>
                        <InputField
                              value={inputAddCode}
                              onChangeText={setInputAddCode}
                              style={styles.TextInput}
                              placeholder="Enter Code"
                            />
                        <TouchableOpacity style={{
                          height: 40,
                          width: 200,
                          backgroundColor: 'dodgerblue',
                          borderRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center'}}
                          onPress={() => joinHousehold()}>
                            <Text style={[styles.text, {color: 'white', fontFamily: 'Inter'}]}>Join Household</Text>
                        </TouchableOpacity>
                      </View>}
                    </TouchableOpacity>
                  </View>}
                </ScrollView>
              </View>
              <View style={styles.rowItem}>
                <Text style={styles.title}>Your Reminders</Text>
                <ScrollView style={styles.tile}>
                  {myReminders ? (
                    <View style={styles.Box}>
                      {myReminders.map((item) => (
                        <TouchableOpacity
                          style={styles.ContentModule}
                          key={item._id}
                          onPress={() => handleListingPress(item)}
                        >
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: "row",
                              width: "100%",
                              height: "67%",
                              marginBottom: 4.4,
                            }}
                          >
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: "column",
                                flexWrap: 'wrap',
                                flexShrink: 1
                              }}
                            >
                              <Text
                                style={[styles.text]}
                              >{monthNames[new Date(item.dueDate).getMonth()]}
                                {' '}
                                {new Date(item.dueDate).getDay()}
                                {', '}
                                {new Date(item.dueDate).getFullYear()}
                                </Text>
                              <Text style={[styles.text]}>
                                {`${item.title}`}{" "}
                              </Text>
                              <Text style={[styles.text, {fontSize: 12}]}>
                                {`${item.description}`}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  ) : (
                    <View>
                      <Text style={styles.text}>Loading...</Text>
                    </View>
                  )}
                </ScrollView>
              </View>
            </View>
          </ContentArea>
        </View>
        {popupVisible && (
          <ListingPopup listing={selectedItem} hidePopup={setPopupVisible} />
        )}
      </SafeAreaView>
    );
}
export default DashBoardScreen;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    fontFamily: 'Roboto',
  },
  header: {
    fontSize: 22,
    fontFamily: 'Roboto',
    marginBottom: 3,
    fontWeight: 'bold'
  },
  containerText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 3,
  },
  text: {
    color: theme.TEXT_COLOR,
    fontFamily: 'Roboto',
  },
  tile: {
    width: "100%",
    height: 450,
    top: 10,
    fontFamily: 'Roboto',
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: theme.CONTAINER_COLOR,
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'Roboto',
    transition: 10
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'Roboto',
  },
  ContentModule: {
    flexBasis: "95%",
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minHeight: 100,
    //aspectRatio: 2.3,
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 12,
    fontFamily: 'Roboto',
  },
  button: {
    height: 20,
    width: 220,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 25,
    color: theme.INPUT_TEXT_COLOR,
    fontFamily: 'Roboto',
  },
  topBar: {
    flexDirection: "row",
    marginTop: 25,
    alignItems: "center",
    fontFamily: 'Roboto',
  },
  images: {
    backgroundColor: "white",
    height: "100%",
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 30
  },
  TextInput: {
    height: 40,
    width: 200,
    fontFamily: 'Roboto',
    color: theme.TEXT_COLOR,
    backgroundColor: theme.CONTAINER_COLOR
  },
});
