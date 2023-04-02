import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';
import { Title } from 'react-native-paper';

import { AuthContext } from '../../context';
import { SafeAreaView } from 'react-navigation';
import InputField from '../components/V2Components/InputField';
import { TouchableOpacity } from 'react-native';
import theme from '../../styles/theme.style'
import { jestResetJsReanimatedModule } from 'react-native-reanimated/lib/reanimated2/core';

const isWeb = Platform.OS === "web";

function DashBoardScreen() {
	const { token } = useContext(AuthContext);
    const { myIp } = useContext(AuthContext).ip;
    const [myListings, setListings] = useState([]);

    useEffect(() => {
         const getListings = async () => {
            try {
                const res = await fetch("http://" + myIp + ":3000/listings/my_listings", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token: token,
                    }),
                    https: false
                });
                const data = await res.json();
                if(res.status == 200){
                    setListings(data.my_listings);
                } else {
                    console.log('Error occured getting listings');
                }
            } catch(error){
                console.log(error);
            }
        };
        getListings();
    },[]);

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
				<View style={{display: 'flex', flexDirection: 'row', padding: 10, width: '100%'}}>
					<View style={styles.rowItem}>
						<Title style={styles.title}>Your Listings</Title>
						<View style={styles.tile}>
							<View style={styles.Box}>
                		    {myListings.map((item) => (
                		        <TouchableOpacity
                		            style={styles.ContentModule}
                		            key={item._id}
                		            onPress={() => navigation.replace("ListingEdit",{listing: item})}
                		        >
                		            <Text style={styles.text}>{`${item.city}, ${item.zip_code}`}</Text>
                		            <Text style={styles.text}>{item.street_name}</Text>
                		            <Text style={styles.text}>{item.rent}</Text>
                		        </TouchableOpacity>
                		    ))}
                			</View>
						</View>
					</View>
					<View style={styles.rowItem}>
						<Title style={styles.title}>Your Roommates</Title>
						<Text style={styles.text}>Nothing to display.</Text>
					</View>
					<View style={styles.rowItem}>
						<Title style={styles.title}>Your Reminders</Title>
						<Text style={styles.text}>Nothing to display.</Text>
					</View>
				</View>


			</ContentArea>
		</View>
		<Button 
			color={'red'}
			title='Logout'
			onPress={handleLogout}
		/>
      </SafeAreaView>
    );
  }
  export default DashBoardScreen;

  const styles = StyleSheet.create({
	rowItem: {
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center'
	},
	text: {
		color: theme.TEXT_COLOR,
		fontSize: 15
	},
	tile: {
		display: 'flex',
		flexDirection: 'row',
		padding: 5,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%'
	},
	Box: {
        flex: 1,
        flexDirection: "row",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: "wrap",
        backgroundColor: theme.CONTAINER_COLOR,
        marginTop: 10
      },
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
      ContentModule: {
		width: '100%',
        marginHorizontal: 4.4,
        marginVertical: 4.4,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        backgroundColor: theme.CONTENT_MODULE_COLOR,
        borderRadius: 10,
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
        fontWeight: 'bold',
		color: theme.INPUT_TEXT_COLOR
      },
      topBar: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
      },
  });