import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ScrollView,
} from "react-native";
import { useContext } from "react";
import { useState, useEffect } from "react";

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';

import { AuthContext } from '../../context';
import { SafeAreaView } from 'react-navigation';
import InputField from '../components/V2Components/InputField';
import { TouchableOpacity } from 'react-native';
import theme from '../../styles/theme.style'
import { jestResetJsReanimatedModule } from 'react-native-reanimated/lib/reanimated2/core';
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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
  }, [addSuccess]);

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
		<View style={styles.container}>
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
								<View style={{flexDirection: 'row', width: '100%', height: '67%', marginBottom: 4.4,}}>
								  <View style={styles.images}>
									<Text>?</Text>
								  </View>
								  <View style={{alignItems: 'flex-start'}}>
									<Text style={[styles.text, {fontWeight: 'bold'}]}>{`${item.city}, ${item.zip_code}`}</Text>
									<Text style={styles.text}>{item.street_name}</Text>
									<Text style={styles.text}>{item.rent}</Text>
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
							  </TouchableOpacity>
                		    ))}
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
                            flexDirection: "row",
                            width: "100%",
                            height: "67%",
                            marginBottom: 4.4,
                          }}
                        >
                          <View
                            style={{
                              alignItems: "flex-start",
                              flexDirection: "column",
                            }}
                          >
                            <Text
                              style={[styles.text, { fontWeight: "bold" }]}
                            >{`${item.dueDate}`}</Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                              {`${item.title}`}{" "}
                            </Text>
                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                              {`${item.description}`}
                            </Text>
                          </View>
                        </View>
                        <Text
                          style={[styles.text, { fontSize: 12, paddingTop: 6 }]}
                        ></Text>
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
  },
  text: {
    color: theme.TEXT_COLOR,
    fontSize: 15,
  },
  tile: {
    width: "100%",
    height: 450,
    top: 10,
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: theme.CONTAINER_COLOR,
    marginTop: 10,
  },
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
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
    marginVertical: 4.4,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    aspectRatio: 2.3,
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 8.8,
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
  },
  topBar: {
    flexDirection: "row",
    marginTop: 15,
    alignItems: "center",
  },
  images: {
    backgroundColor: "white",
    height: "100%",
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
