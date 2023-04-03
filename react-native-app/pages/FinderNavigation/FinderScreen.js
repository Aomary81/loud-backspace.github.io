import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
  useWindowDimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-navigation";
import React, { useState, useContext } from "react";
import InputField from "../components/V2Components/InputField";
import { AuthContext } from "../../context";
import theme from '.././../styles/theme.style'
import IconedTitle from "../components/V2Components/IconedTitle";
import ContentArea from '../components/V2Components/ContentAreaV2';
import ContentAreaHeaderBar from '../components/V2Components/ContentAreaHeaderBar';
import BlurredPopup from "../components/V2Components/BlurredPopup";

export default function FinderScreen({ navigation }) {
  const isWeb = Platform.OS === "web";
  const { myIp } = useContext(AuthContext).ip;
  const [zipCode, getZipCode] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const {width} = useWindowDimensions();

  const SearchListings = async () => {
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
        setNumResults(result.numResults);
        setData(result.listing);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePress = (item) => {
    setSelectedItem(item);
    setPopupVisible(true);
  };

  React.useEffect(() => {
    SearchListings();
  }, [pageNum]);

  const incrementPage = async () => {
    let temp = pageNum + 1;
    setPageNum(temp);
  };
  const decrimentPage = async () => {
    let temp = pageNum - 1;
    setPageNum(temp);
  };

  let shrinkFB = width < 1360;
  let shrinkCLB = width < 1135;
  let hideIntro = width < 899;

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar style="auto" />
      <View style={styles.container}>
			<ContentArea>
				<ContentAreaHeaderBar style={{justifyContent: 'flex-end'}}>
          <IconedTitle 
						  img="https://cdn-icons-png.flaticon.com/512/673/673035.png"
						  title={hideIntro ? '' : "Roommate Finder"}
						  description={hideIntro ? '' : "Find roommates according to your interests"}
					  />
            <View style={{width: hideIntro? 0 : 30}}/>
            <InputField
              style={styles.TextInput}
              placeholder="Search By Zipcode"
              value={zipCode}
              onChangeText={getZipCode}
              onSubmitEditing={SearchListings}
              startDisabled={true}
              rounded
              startButton={<Ionicons
                name={"search"}
                size={25}
                color={'grey'}
              />}
            />
            <View style={{flex: 1}}/>
            <TouchableOpacity
              style={[styles.createListingButton, {
                  width: shrinkCLB ? 40 : 230,
                  marginRight: 5
                }]}
              onPress={() => navigation.navigate("ListingCreation")}>
              { !shrinkCLB && <Text style={{fontWeight: 'bold'}}>Create Listing</Text>}
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.filterButton, {width: shrinkFB ? 40 : 215}]}>
              { !shrinkFB && <Text style={{fontWeight: 'bold'}}>Filter</Text>}
            </TouchableOpacity>
				  </ContentAreaHeaderBar>
          <View style={{alignSelf: 'flex-start', flexDirection: 'row'}}>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>Search results({numResults})</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("My Listings")}
            >
              <Text>View my listings</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={{height: '80%', width: '100%'}}>
          <View style={styles.Box}>
            {data.map((item) => (
              <TouchableOpacity
                style={[styles.ContentModule, {
                  flexBasis: width > 1200 ?
                    '24.1%' :
                    ( width > 1100 ? '32.2%' :
                    (width > 750 ? '48.5%' :
                    '98%'))
                }]}
                key={item._id}
                onPress={() => handlePress(item)}
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
                <Text style={[ styles.text,{fontSize: 12}]}>Last updated</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={{
          height: 35,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'flex-end',
          }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {(pageNum > 1) && <TouchableOpacity onPress={() => decrimentPage()}>
                <Ionicons
                  name={'chevron-back-outline'}
                  size={25}
                  color={theme.TEXT_COLOR}
                />
              </TouchableOpacity>}
              {(numResults > 0) && <Text
                style={[styles.text, {fontSize: 16, paddingHorizontal: 4}]}>
                {(pageNum*16 > numResults) ? (pageNum-1)*16 + numResults % 16 : pageNum*16} of {numResults}
              </Text>}
              {(numResults > pageNum*16) && <TouchableOpacity onPress={() => incrementPage()}>
                <Ionicons
                  name={'chevron-forward-outline'}
                  size={25}
                  color={theme.TEXT_COLOR}
                />
              </TouchableOpacity>}
            </View>
        </View>
			  </ContentArea>
		</View>
    {isWeb && popupVisible && <BlurredPopup onExitPress={() => setPopupVisible(false)}>
        <View style={{height: '37%', width: '90%',flexDirection: 'row', marginBottom: 4}}>
          <View style={{width: '40%', height: '100%', flexDirection: 'row'}}>
            <View style={{flex: 2.062, margin: 2}}>
              <View style={styles.popupImages}>
                <Text>?</Text>
              </View>
            </View>
            <View style={{flex: 1, margin: 2}}>
              <View style={styles.popupImages}>
                <Text>?</Text>
              </View>
              <View style={styles.popupImages}>
                <Text>?</Text>
              </View>
            </View>
          </View>
          <View style={{paddingHorizontal: 20}}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25, paddingBottom: 2}]}>
              {`${selectedItem.city}, ${selectedItem.zip_code}`}
              </Text>
            <Text style={[styles.text, {fontSize: 16, paddingBottom: 2}]}>{selectedItem.street_name}</Text>
            <Text style={[styles.text, {fontSize: 16, paddingBottom: 2}]}>{selectedItem.rent}</Text>
            <View style={{flexGrow: 1, flexDirection: 'row'}}>
              <View
                style={{
                  width: 46, 
                  height: '100%' 
                  ,alignItems: 'flex-start', 
                  justifyContent: 'center'}}>
                <View 
                  style={{
                    backgroundColor: 'green', 
                    height: 45, 
                    width: 45, 
                    borderRadius: 45, 
                    borderWidth: 2}}/>
              </View>
              <View style={{height: '90%', justifyContent: 'flex-end', paddingLeft: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {paddingRight: 4}]}>
                    {selectedItem.first_name} {selectedItem.last_name}
                    </Text>
                  <View>
                    {(selectedItem.gender === 'male') && 
                      <Ionicons
                        name={"male-outline"}
                        size={16}
                        color={'blue'}
                      />}
                    {(selectedItem.gender === 'female') &&
                      <Ionicons
                        name={"female-outline"}
                        size={16}
                        color={'pink'}
                      />}
                    {(selectedItem.gender === 'non-binary') &&
                      <Ionicons
                        name={"male-female-outline"}
                        size={16}
                        color={'black'}
                      />}
                  </View>
                </View>
                <Text style={{color: 'blue', fontSize: 14, paddingBottom: 2}}>
                  Contact: {selectedItem.contact}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={[styles.text, {fontSize: 25, paddingLeft: 3}]}>
          {selectedItem.first_name} prefers roommates who are:
        </Text>
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
          width: '100%',
          paddingVertical: 5,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 40
          }}>
            {selectedItem.tags[0].split(',').map((item) => (
              <View style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                height: '100%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4
              }}>
              <Text style={[styles.text,{fontWeight: 'bold', paddingHorizontal: 20}]}>
                {item}
              </Text>
            </View>
          ))}
          </View>
        </ScrollView>
        <View style={{height: '34%', paddingHorizontal: 5}}>
          <Text style={{color: theme.TEXT_COLOR}}>
            {selectedItem.bio}
          </Text>
        </View>
        <Text style={{color: theme.TEXT_COLOR}}>
          Last updated: {
            Math.floor((Date.now() - Date.parse(selectedItem.updatedAt)) / (1000*60*60*24))
          } days ago
        </Text>
      </BlurredPopup>}
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
  input: {
    marginBottom: 10,
  },
  button: {
    height: 20,
    width: 120,
    backgroundColor: "dodgerblue",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginTop: 3
  },
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 0,
    fontSize: 15,
    color: theme.INPUT_TEXT_COLOR,
    marginLeft: 5
  },
  ContentModule: {
    marginHorizontal: 4.4,
    marginVertical: 4.4,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    aspectRatio: 2.3,
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 8.8
  },
  Box: {
    flex: 1,
    flexDirection: "row",
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: "wrap",
    width: '100%',
    height: 600,
    backgroundColor: theme.CONTAINER_COLOR,
    marginTop: 10
  },
  createListingButton: {
    height: 40,
    width: 230,
    backgroundColor: "#92EBFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    height: 40,
    width: 200,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 'auto',
  },
  images: {
    backgroundColor: theme.TEXT_COLOR,
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 4.4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
		color: theme.TEXT_COLOR,
		fontSize: 15
	},
  popupImages: {
    backgroundColor: theme.TEXT_COLOR,
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  }
});
