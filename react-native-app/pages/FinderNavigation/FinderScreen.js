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
import ListingPopup from "../components/V2Components/ListingPopup";
import { useFocusEffect } from "@react-navigation/native";

export default function FinderScreen({ navigation }) {
  const isWeb = Platform.OS === "web";
  const { myIp } = useContext(AuthContext).ip;
  const [zipCode, getZipCode] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [data, setData] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [selectedItem, setSelectedItem] = useState();
  const {width} = useWindowDimensions();
  const [popupVisible, setPopupVisible] = useState(false);
  const [priceLowHigh, setPriceLowHigh] = useState(false);
  const [priceHighLow, setPriceHighLow] = useState(false);
  const [showMale, setShowMale] = useState(true);
  const [showFemale, setShowFemale] = useState(true);
  const [showNonBinary, setShowNonBinary] = useState(true);
  const [includeGender, setIncludeGender] = useState(['male', 'female', 'non-binary']);
  const [sort, setSort] = useState(0);
  const [useGenderFilter, setUseGenderFilter] = useState(false);
  const [fiterVisible, setFilterVisible] = useState(false);

  const togglePriceLowHigh = () => {
    if(priceLowHigh){
      setPriceLowHigh(false);
      setSort(0);

    } else {
      setPriceLowHigh(true);
      setPriceHighLow(false);
      setSort(1);
    }
  };

  const togglePriceHighLow = () => {
    if(priceHighLow){
      setPriceHighLow(false);
      setSort(0);
    } else {
      setPriceHighLow(true);
      setPriceLowHigh(false);
      setSort(-1);
    }
  };

  const toggleShowMale = () => {
    if(showMale){
      setShowMale(false);
    } else {
      setShowMale(true);
    }
  };

  const toggleShowFemale = () => {
    if(showFemale){
      setShowFemale(false);
    } else {
      setShowFemale(true);
    }
  };

  const toggleNonBinary = () => {
    if(showNonBinary){
      setShowNonBinary(false);
    } else {
      setShowNonBinary(true);
    }
  };

  const updateGenderFilter = () => {
    let tempIncludeGender = [];
    if(showMale){
      tempIncludeGender.push('male');
    }
    if(showFemale){
      tempIncludeGender.push('female');
    }
    if(showNonBinary){
      tempIncludeGender.push('non-binary');
    }
    setIncludeGender(tempIncludeGender);
  };

  const toggleUseGenderFilter = () => {
    if(useGenderFilter){
      setShowMale(true);
      setShowFemale(true);
      setShowNonBinary(true);
      setUseGenderFilter(false);
    } else {
      setShowMale(false);
      setShowFemale(false);
      setShowNonBinary(false);
      setUseGenderFilter(true);
    }
  };

  const toggleFilterVisible = () => {
    if(fiterVisible){
      setFilterVisible(false);
    } else {
      setFilterVisible(true);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      updateGenderFilter();
    }, [showMale,showFemale,showNonBinary,useGenderFilter])
  )

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
          gender: includeGender,
          sort: sort
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
  }, [pageNum, sort, includeGender]);

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
      {fiterVisible && <View
        style={{
          position: 'absolute',
          right: 0,
          top: 50,
          width: 215,
          backgroundColor: '#D9D9D9',
          zIndex: 1,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: shrinkFB ? 10 : 0,
          borderWidth: 10,
          borderColor: '#D9D9D9'
        }}>
        <View style={{ paddingBottom: 10}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.filterCircle}
              onPress={() => toggleUseGenderFilter()}
              >
                {useGenderFilter && <Ionicons
                name={"checkmark-outline"}
                size={15}
                color={'green'}
              />}
            </TouchableOpacity>
            <Text style={styles.filterText}>
              Gender
            </Text>
          </View>
          {useGenderFilter && <View style={{paddingLeft: 30}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.filterCircle}
                onPress={() => toggleShowMale()}
                >
                  {showMale && <Ionicons
                  name={"checkmark-outline"}
                  size={15}
                  color={'green'}
                />}
              </TouchableOpacity>
              <Text style={styles.filterText}>
                Male
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.filterCircle}
                onPress={() => toggleShowFemale()}
                >
                  {showFemale && <Ionicons
                  name={"checkmark-outline"}
                  size={15}
                  color={'green'}
                />}
              </TouchableOpacity>
              <Text style={styles.filterText}>
                Female
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.filterCircle}
                onPress={() => toggleNonBinary()}
                >
                  {showNonBinary && <Ionicons
                  name={"checkmark-outline"}
                  size={15}
                  color={'green'}
                />}
              </TouchableOpacity>
              <Text style={styles.filterText}>
                Non-Binary
              </Text>
            </View>
          </View>}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
              style={styles.filterCircle}
              onPress={() => togglePriceLowHigh()}
              >
                {priceLowHigh && <Ionicons
                name={"checkmark-outline"}
                size={15}
                color={'green'}
              />}
          </TouchableOpacity>
          <Text style={styles.filterText}>
            Budget (Low to High)
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
              style={styles.filterCircle}
              onPress={() => togglePriceHighLow()}
              >
                {priceHighLow && <Ionicons
                name={"checkmark-outline"}
                size={15}
                color={'green'}
              />}
          </TouchableOpacity>
          <Text style={styles.filterText}>
            Budget (High to Low)
          </Text>
        </View>
      </View>}
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
              style={[styles.filterButton, 
                {width: shrinkFB ? 40 : 215,
                borderBottomLeftRadius: fiterVisible ? 0 : 10,
                borderBottomRightRadius: fiterVisible ? 0 : 10
              }]}
              onPress={() => toggleFilterVisible()}>
              { !shrinkFB && 
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Ionicons name={"funnel-outline"} size={15} color={theme.TEXT_COLOR} />
                <Text style={{fontWeight: 'bold', marginLeft: 5}}>Filter</Text>
              </View>
              }
            </TouchableOpacity>
				  </ContentAreaHeaderBar>
          <View style={{marginLeft: 8, alignSelf: 'flex-start', flexDirection: 'row'}}>
            <Text style={{fontSize: 20}}>Search results ({numResults})</Text>
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
                    <Text style={[styles.text]}>{`${item.city}, ${item.zip_code}`}</Text>
                    <Text style={[styles.text]}>{item.street_name}</Text>
                    <Text style={styles.text}>${item.rent}/month</Text>
                  </View>
                </View>
                <Text style={[ styles.text,{fontSize: 12}]}>
                  Last updated: {
            			Math.floor((Date.now() - Date.parse(item.updatedAt)) / (1000*60*60*24))
          				} days ago
                </Text>
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
    {popupVisible && <ListingPopup listing={selectedItem} hidePopup={setPopupVisible}/>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontFamily: 'Roboto',
    marginBottom: 3,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
  },
  containerText: {
    fontSize: 18,
    fontFamily: 'Roboto',
    marginBottom: 3,
    fontFamily: 'Roboto',
  },
  background: {
    flex: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  container:{
    flex: 1,
    width: '100%',
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
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
    marginTop: 3,
    fontFamily: 'Roboto',
  },
  TextInput: {
    height: 40,
    width: 220,
    marginBottom: 0,
    fontSize: 15,
    color: theme.INPUT_TEXT_COLOR,
    marginLeft: 5,
    fontFamily: 'Roboto',
  },
  ContentModule: {
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    //aspectRatio: 2.3,
    backgroundColor: theme.CONTENT_MODULE_COLOR,
    borderRadius: 10,
    padding: 10,
    fontFamily: 'Roboto',
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
    marginTop: 10,
    fontFamily: 'Roboto',
  },
  createListingButton: {
    height: 40,
    width: 230,
    backgroundColor: "#92EBFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'Roboto',
  },
  filterButton: {
    height: 40,
    width: 200,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 'auto',
    fontFamily: 'Roboto',
  },
  images: {
    backgroundColor: theme.TEXT_COLOR,
    height: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    marginRight: 4.4,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Roboto',
  },
  text: {
		color: theme.TEXT_COLOR,
		fontSize: 15,
    fontFamily: 'Roboto',
	},
  popupImages: {
    backgroundColor: theme.TEXT_COLOR,
    width: '100%',
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    fontFamily: 'Roboto',
  },
  filterText: {
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 5,
    fontFamily: 'Roboto',
  },
  filterCircle: {
    height: 18,
    width: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto',
  },
});
