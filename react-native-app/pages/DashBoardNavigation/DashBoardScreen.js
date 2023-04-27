import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  useWindowDimensions,
  Alert
} from "react-native";
import { useContext } from "react";
import { useState, useCallback} from "react";
import { useFocusEffect } from "@react-navigation/native";

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';

import { AuthContext } from '../../context';
import InputField from '../components/V2Components/InputField';
import { TouchableOpacity } from 'react-native';
import theme from '../../styles/theme.style';
import ReminderPopup from "../components/V2Components/RemiderPopup";
import ListingPopup from '../components/V2Components/ListingPopup';
import Ionicons from "react-native-vector-icons/Ionicons";

import ScreenLayout from "../components/V2Components/ScreenLayout";

import ConfirmationPopup from "../components/V2Components/ConfirmationPopup";

const isWeb = Platform.OS === "web";

function DashBoardScreen() {
  const { token } = useContext(AuthContext);
  const { myIp } = useContext(AuthContext).ip;
  const [myListings, setListings] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [household, setHousehold] = useState();
  const [createPressed, setCreatePressed] = useState(false);
  const [householdName, setHouseholdName] = useState('');
  const [members, setMembers] = useState([]);
	const [addCode, setAddCode] = useState('');
	const [inputAddCode, setInputAddCode] = useState('');
	const [addSuccess, setAddSuccess] = useState(false);
	const [addPressed, setAddPressed] = useState(false);
  const [myReminders, setReminders] = useState([]);
  const [listPopPressed, setListPopPressed] = useState(false);
  const [reminderPopPressed, setReminderPopPressed] = useState(false);
  const [currentTab, setCurrentTab] = useState('reminders');
  const [delHouseholdPressed, setDelHouseholdPressed] = useState(false);
  const [delReminderPressed, setDelReminderPressed] = useState(false);
  const [delListingPressed, setDelListingPressed] = useState(false);
  const [listingDel, setListingDel] = useState();
  const [reminderDel, setReminderDel] = useState();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const {width} = useWindowDimensions();
  const isLandscape = width > 700

  const handleListingPress = (item) => {
    setSelectedItem(item);
    setListPopPressed(true);
  };

  const handleReminderPress = (item) => {
    setSelectedItem(item);
    setReminderPopPressed(true);
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
      getListings();
    }, [])
  );

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

  useFocusEffect(
    useCallback(() => {
      getHousehold();
    }, [addSuccess])
  );

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
        setHousehold(data.household);
        setMembers(data.members);
        setHouseholdName(data.name)
      } else {
        console.log("Error occured getting household");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => { 
      getReminders();
    }, [addSuccess])
  );

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
        console.log(data.reminders)
        setReminders(data.reminders.sort((a,b) => 
        (a.dueDate > b.dueDate) ? 1 : 
        ((b.dueDate > a.dueDate) ? -1 : 0)));
      } else {
        console.log("Error occured getting reminders");
      }
    } catch (error) {
      console.log(error);
    }
  };

	const SubmitHousehold = async () => {
		try {
		  const response = await fetch(
        "http://" + myIp + ":3000/household/create",
        {
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
        }
      );
      const data = await response.json();
      if (response.status == 200) {
        setHousehold(data.household);
      }
		} catch (error) {
		  console.log(error.message);
		}
	};

  const getAddCode = async () => {
  try {
    const response = await fetch(
      "http://" + myIp + ":3000/household/invite",
      {
        method: "POST",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
    
        body: JSON.stringify({
        token: token,
        }),
        https: false, // Set the https option to true
      }
    );
    const data = await response.json();
    if (response.status == 200) {
      setAddCode(data.addCode);
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
			  setAddSuccess(data.success);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

  const deleteListing = async (id) => {
    setDelListingPressed()
    try {
      const response = await fetch("http://" + myIp + ":3000/listings/delete", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          listing_id: listingDel || id,
          token: token,
        }),
        https: false, // Set the https option to true
      });
      if (response.status == 200) {
        getListings()
        setListingDel(undefined)
      } else {
        console.log("Error occured deleting listing");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteReminder = async (id) => {
    setDelReminderPressed(false)
    try {
      const response = await fetch(
        "http://" + myIp + ":3000/reminders/delete",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            reminder_id: reminderDel || id,
            token: token,
          }),
          https: false, // Set the https option to true
        }
      );
      if (response.status == 200) {
        getReminders()
        setReminderDel(undefined)
      } else {
        console.log("Error occured deleting reminder");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const leaveHousehold = async () => {
    setDelHouseholdPressed(false)
    try {
      const response = await fetch(
        "http://" + myIp + ":3000/household/leave",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
          https: false, // Set the https option to true
        }
      );
      if (response.status == 200) {
        setHousehold(null)
        setHouseholdName('')
        setReminders([])
      } else {
        console.log("Error occured leaving household");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const confirmHousehold = () =>
    Alert.alert('Leave Household?', '', [
      {
        text: 'Yes',
        onPress: () => leaveHousehold(),
      },
      {
        text: 'Cancel',
        style: 'cancel'
      }
    ]);

  const confirmReminder = (id) =>
    Alert.alert('Delete reminder?', '', [
      {
        text: 'Yes',
        onPress: () => {setReminderDel(undefined), deleteReminder(id)},
      },
      {
        text: 'Cancel',
        onPress: () => setReminderDel(undefined),
        style: 'cancel',
      }
    ]);

  const confirmListing = (id) =>
    Alert.alert('Delete listing?', '', [
      {
        text: 'Yes',
        onPress: () => {setListingDel(undefined),deleteListing(id)},
      },
      {
        text: 'Cancel',
        onPress: () => setListingDel(undefined),
        style: 'cancel',
      }
    ]);

  return (
    <ScreenLayout>
      <ContentArea style={{display: 'flex', flexDirection: 'column'}}>
        <ContentAreaHeaderBar>
          <IconedTitle 
            img="https://cdn-icons-png.flaticon.com/512/1828/1828740.png"
            title="Dashboard"
            description="View recent account activity"
          />
        </ContentAreaHeaderBar>
        {!isLandscape && <View style={{
          width: '100%',
          height: 15,
          flexDirection: 'row'
          }}>
          <TouchableOpacity
            onPress={() => setCurrentTab('reminders')}
            style={{
              flex: 1,
              backgroundColor: (currentTab === 'reminders') ? '#AFD2FF' : '#DCEAFE',
              borderRadius: 5,
              marginRight: 5
            }}
          />
          <TouchableOpacity
            onPress={() => setCurrentTab('roommates')}
            style={{
              flex: 1,
              backgroundColor: (currentTab === 'roommates') ? '#AFD2FF' : '#DCEAFE',
              borderRadius: 5
            }}
          />
          <TouchableOpacity
            onPress={() => setCurrentTab('listings')}
            style={{
              flex: 1,
              backgroundColor: (currentTab === 'listings') ? '#AFD2FF' : '#DCEAFE',
              borderRadius: 5,
              marginLeft: 5
            }}
          />
        </View>}
        <View style={{flex: 1, flexDirection: 'row', width: '100%', height: '100%'}}>
          <View style={[styles.rowItem,{
            display: (isLandscape || currentTab === 'listings') ? 'flex' : 'none'
          }]}>
            <View style={{width: '100%'}}>
              <Text style={styles.title}>Your Listings</Text>
            </View>
            <ScrollView style={[styles.tile, {height: isWeb ? 450 : '100%'}]}>
              {myListings ? <View style={styles.Box}>
                {myListings.map((item) => (
                <TouchableOpacity
                style={[styles.ContentModule, {height: isWeb ? undefined : 120,}]}
                key={item._id}
                onPress={() => handleListingPress(item)}
                >
                  <View style={{
                    flexDirection: "row",
                    width: isWeb ? '95%' : undefined,
                  }}>
                    <View style={{width: isWeb ? '100%' : '95%'}}>
                      <View style={{flexDirection: 'row', width: '100%', height: '67%', marginBottom: 4.4,}}>
                        <View style={styles.images}>
                        <Ionicons
                          name={'image-outline'}
                          size={25}
                          color={theme.TEXT_COLOR}
                        />
                        </View>
                        <View style={{alignItems: 'flex-start', width: '70%'}}>
                        <Text style={[styles.text, {fontWeight: 'bold', width: '100%'}]}>{`${item.city}, ${item.zip_code}`}</Text>
                        <Text style={[styles.text,{width: '100%'}]}>{`${item.bed} Bed, ${item.bath} Bath`}</Text>
                        <Text style={[styles.text,{width: '100%'}]}>{'$'+item.rent+'/month'}</Text>
                        </View>
                      </View>
                      <Text 
                        style={[styles.text,
                        {fontSize: 12,
                        paddingTop: 6
                        }]}>
                          Last updated: {
                            Math.floor((Date.now() - Date.parse(item.updatedAt)) / (1000*60*60*24))
                            } days ago
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        height: 18,
                        width: 16,
                        justifyContent: 'center'
                      }}
                      onPress={isWeb ? () => {setListingDel(item._id), setDelListingPressed(true)}
                       : () => confirmListing(item._id)}
                      >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color={theme.TEXT_COLOR}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>))}
              </View> :
              <View>
                <Text style={styles.text}>Loading...</Text>
              </View>
              }
            </ScrollView>
          </View>
          <View style={[styles.rowItem,{
            display: (isLandscape || currentTab === 'roommates') ? 'flex' : 'none'
          }]}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <Text style={[styles.title,{width: '80%'}]}
                numberOfLines={1}>{household ? householdName : 'Household'}
              </Text>
              {household && <View style={{width: '18%',
                alignItems: 'flex-end',
                justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={ isWeb ? () => setDelHouseholdPressed(true) : confirmHousehold}
                  style={{backgroundColor: '#FFDBDB',
                    borderRadius: 5,
                    height: 30,
                    width: 30,
                    justifyContent: 'center',
                    alignItems: 'center'}}
                  >
                    <Ionicons
                        name="exit-outline"
                        size={20}
                        color={"#333"}
                      />
                </TouchableOpacity>
              </View>}
            </View>
              <ScrollView style={[styles.tile, {height: isWeb ? 450 : '100%'}]}>
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
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'}]}>
                    <View>
                      <Ionicons
                        name={"add-circle-outline"}
                        size={25}
                        color={theme.TEXT_COLOR}
                      />
                    </View>
                    <Text style={[styles.text,{
                      fontWeight: 'bold'
                      }]}>
                      Invite Members
                    </Text>
                </TouchableOpacity> :
                <View
                  style={[styles.ContentModule,{
                    height: 100,
                    alignItems: 'center',
                    justifyContent: 'center'}]}>
                  <Text style={[styles.text,{
                    fontWeight: 'bold'
                    }]}>
                    {addCode.toUpperCase().slice(0,2)}-
                    {addCode.toUpperCase().slice(2,4)}-
                    {addCode.toUpperCase().slice(4,6)}-
                    {addCode.toUpperCase().slice(6,8)}
                  </Text>
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
                    fontWeight: 'bold'
                  }]}>
                    Create Household
                  </Text>
                  {createPressed && <View
                  style={{height: 100, alignItems: 'center'}}>
                    <InputField
                          value={householdName}
                          onChangeText={setHouseholdName}
                          style={styles.TextInput}
                          placeholder="Household name"
                        />
                    <TouchableOpacity style={{
                      height: 40,
                      width: 100,
                      backgroundColor: 'dodgerblue',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'}}
                      onPress={() => SubmitHousehold()}>
                        <Text style={styles.text}>Create</Text>
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
                    fontWeight: 'bold'
                  }]}>
                    Join household
                  </Text>
                  {addPressed && <View
                  style={{height: 100, alignItems: 'center'}}>
                    <InputField
                          value={inputAddCode}
                          onChangeText={setInputAddCode}
                          style={styles.TextInput}
                          placeholder="Add code"
                        />
                    <TouchableOpacity style={{
                      height: 40,
                      width: 100,
                      backgroundColor: 'dodgerblue',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center'}}
                      onPress={() => joinHousehold()}>
                        <Text style={styles.text}>Join</Text>
                    </TouchableOpacity>
                  </View>}
                </TouchableOpacity>
              </View>}
            </ScrollView>
          </View>
          <View style={[styles.rowItem,{
            display: (isLandscape || currentTab === 'reminders') ? 'flex' : 'none'
          }]}>
            <View style={{width: '100%'}}>
              <Text style={styles.title}>Reminders</Text>
            </View>
            <ScrollView style={[styles.tile, {height: isWeb ? 450 : '100%'}]}>
              {myReminders ? (
                <View style={styles.Box}>
                  {myReminders.map((item) => (
                    <TouchableOpacity
                      style={styles.ContentModule}
                      key={item._id}
                      //onPress={() => {setReminderPopPressed(true), setSelectedItem(item)}}
                      >
                      <View
                        style={{
                          flexDirection: "row",
                          width: '95%'
                        }}
                        >
                        <View
                          style={{
                            alignItems: "flex-start",
                            flexDirection: "column",
                            width: '100%',
                          }}
                        >
                          <Text
                            style={[styles.text, { fontWeight: "bold" }]}>
                          
                          {' ' +monthNames[parseInt(item.dueDate.slice(5,7))-1]}
                            {', '}
                            {item.dueDate.slice(8,10)}
                            {' '}
                            {item.dueDate.slice(0,4)}
                            </Text>
                          <Text style={[styles.text, {fontWeight: "bold", width: '100%'}]}>
                            
                            {` ${item.title}`}{" "}
                          </Text>
                          
                          <Text style={[styles.text, {width: '100%'}]}>
                            
                            {` ${item.description}`}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={{
                            height: 18,
                            width: 16,
                            justifyContent: 'center'
                          }}
                          onPress={ isWeb ? () => {setReminderDel(item._id), setDelReminderPressed(true)} : 
                            () => confirmReminder(item._id)}
                          >
                          <Ionicons
                            name="trash-outline"
                            size={18}
                            color={theme.TEXT_COLOR}
                          />
                        </TouchableOpacity>
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
      {isWeb && delHouseholdPressed && (
        <ConfirmationPopup
          hidePopup={setDelHouseholdPressed}
          confirm={leaveHousehold}
          text={'Leave household?'}/>
      )}
      {isWeb && delReminderPressed && (
        <ConfirmationPopup
          hidePopup={setDelReminderPressed}
          confirm={deleteReminder}
          text={'Delete reminder?'}/>
      )}
      {isWeb && delListingPressed && (
        <ConfirmationPopup
          hidePopup={setDelListingPressed}
          confirm={deleteListing}
          text={'Delete listing?'}/>
      )}
      {reminderPopPressed && (
        <ReminderPopup reminder={selectedItem} hidePopup={setReminderPopPressed} />
      )}
      {listPopPressed && (
        <ListingPopup listing={selectedItem} hidePopup={setListPopPressed} />
      )}
    </ScreenLayout>
  );
}
export default DashBoardScreen;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
  },
  text: {
    color: theme.TEXT_COLOR,
    fontSize: 15,
  },
  tile: {
    width: "100%",
    height: 450,
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: theme.CONTAINER_COLOR,
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
  },
  ContentModule: {
    flexBasis: "95%",
    marginHorizontal: 4.4,
    marginBottom: 8.8,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 8.8,
    flexGrow: 1
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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: theme.INPUT_TEXT_COLOR,
    padding: 10
  },
  topBar: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  images: {
    backgroundColor: "#D9D9D9",
    height: 60,
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 4.4,
    alignItems: "center",
    justifyContent: "center",
  },
  TextInput: {
    height: 40,
    width: 200,
    borderColor: "black",
  },
});
