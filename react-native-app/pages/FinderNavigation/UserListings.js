import { useEffect, useState, useContext } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text, StatusBar } from "react-native";
import theme from '../../styles/theme.style'

import { AuthContext } from "../../context";

export default function UserListings({navigation}){
    const { token } = useContext(AuthContext);
    const { myIp } = useContext(AuthContext).ip;
    const [myListings, setListings] = useState([]);

    useEffect(() => {
         const getListings = async () => {
            try {
                const res = await fetch(process.env.BACKEND_IP_PORT+"/listings/my_listings", {
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

    if(!myListings){
        return (
            <SafeAreaView style={styles.container}>
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <StatusBar/>
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.title}>My Listings</Text>
                    </View>
                </View>
                <View style={styles.Box}>
                    {myListings.map((item) => (
                        <TouchableOpacity
                            style={styles.ContentModule}
                            key={item._id}
                            onPress={() => navigation.replace("Edit Listing Screen",{listing: item, prev: 'My Listings Screen'})}
                        >
                            <Text style={styles.text}>{`${item.city}, ${item.zip_code}`}</Text>
                            <Text style={styles.text}>{item.street_name}</Text>
                            <Text style={styles.text}>{item.rent}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </SafeAreaView>
    );
}

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
      ContentModule: {
        flexBasis: '24.1%',
        marginHorizontal: 4.4,
        marginVertical: 4.4,
        alignItems: "center",
        justifyContent: "center",
        height: 100,
        backgroundColor: theme.CONTENT_MODULE_COLOR,
        borderRadius: 10,
      },
      Box: {
        flex: 1,
        flexDirection: "row",
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        flexWrap: "wrap",
        width: '100%',
        backgroundColor: theme.CONTAINER_COLOR,
        marginTop: 10
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
        marginLeft: 60,
        marginRight: 30
      },
      topBar: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center'
      },
  });
  