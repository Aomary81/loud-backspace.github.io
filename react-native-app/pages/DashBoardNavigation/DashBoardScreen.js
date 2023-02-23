import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import IconedTitle from '../components/V2Components/IconedTitle';
import AppButton from '../components/V2Components/AppButton';

import { AuthContext } from '../../context';
import { SafeAreaView } from 'react-navigation';

const isWeb = Platform.OS === "web";

function DashBoardScreen() {
	const { signIn, setToken } = useContext(AuthContext).authContext;
	const { myIp } = useContext(AuthContext).ip;

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
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Text>Dashboard View</Text>
		<Button 
			color={'red'}
			title='Logout'
			onPress={handleLogout}
		/>
		<ContentArea>
			<ContentAreaHeaderBar>
				<IconedTitle 
					img="https://i.imgflip.com/5wkj5m.png"
					title="Dashboard"
					description="Uhhhhh, dashboard stuff..."
				/>
				<Text> [Middle Content] </Text>
				<Text> [End content] </Text>
			</ContentAreaHeaderBar>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
			<Text> Test Content Area </Text>
		</ContentArea>
      </SafeAreaView>
    );
  }
  export default DashBoardScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });