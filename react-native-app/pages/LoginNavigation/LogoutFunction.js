/*
This is just a copy of the function for logging out, it shows what is required
for it to work. To use the function itself needs to be put in a component 
and called.
*/

import { Platform } from 'react-native';
import { useContext } from 'react';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from '../../context';

const isWeb = Platform.OS === "web";
function SomeComponent() {
    const { signIn, setToken } = useContext(AuthContext).authContext;
    const { myIp } = useContext(AuthContext).ip;
    
    const handleLogout = () => {
        if(!isWeb){
            setToken(null);
            deleteToken('userToken');
            signIn(false);
        } else {
            fetch(process.env.BACKEND_IP_PORT+'/auth/logout', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
                https: false,
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
}
export default SomeComponent;