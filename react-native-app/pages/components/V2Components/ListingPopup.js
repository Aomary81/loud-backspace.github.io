import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions,
    Platform
  } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import theme from '../../../styles/theme.style';
import BlurredPopup from './BlurredPopup';

export default function ListingPopup({listing, hidePopup}){
    const {width} = useWindowDimensions()
    const isLandscape = width > 700
    const isWeb = Platform.OS ==='web'
    return (
      <BlurredPopup onExitPress={() => hidePopup(false)}>
        <View style={{margin: 10,
          marginRight: isLandscape ? 40 : 10,
          marginTop: isLandscape ? 10 : 40,
          maxWidth: isLandscape ? undefined : 280}}>
        <View style={{
          flexDirection: isLandscape ? 'row' : 'column',
          flexShrink: 1}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{}}>
              <View style={[styles.popupImages,{width: isLandscape? 110 : 180}]}>
                <Ionicons
                  name={'image-outline'}
                  size={50}
                  color={theme.TEXT_COLOR}
                />
              </View>
            </View>
            <View style={{}}>
              <View style={[styles.popupImages,{width: isLandscape? 53 : 88}]}>
                <Ionicons
                  name={'image-outline'}
                  size={25}
                  color={theme.TEXT_COLOR}
                />
              </View>
              <View style={[styles.popupImages,{width: isLandscape? 53 : 88}]}>
                <Ionicons
                  name={'image-outline'}
                  size={25}
                  color={theme.TEXT_COLOR}
                />
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, maxWidth: 300}}>
            <Text style={[styles.text, {fontWeight: 'bold', fontSize: 25}]}>
              {`${listing.city}, ${listing.zip_code}`}
              </Text>
            <Text style={[styles.text, {fontSize: 16}]}>{listing.street_name}</Text>
            <Text style={[styles.text, {fontSize: 16}]}>{'$'+listing.rent+ '/month'}</Text>
            <View style={{flexGrow: 1, flexDirection: 'row'}}>
              <View
                style={{ 
                  alignItems: 'flex-start', 
                  justifyContent: 'center'}}>
                <View 
                  style={{
                    backgroundColor: 'green', 
                    height: 45, 
                    width: 45, 
                    borderRadius: 45, 
                    borderWidth: 2}}/>
              </View>
              <View style={{justifyContent: 'flex-end', paddingLeft: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.text, {paddingRight: 4}]}>
                    {listing.first_name} {listing.last_name}
                    </Text>
                  <View>
                    {(listing.gender === 'male') && 
                      <Ionicons
                        name={"male-outline"}
                        size={16}
                        color={'blue'}
                      />}
                    {(listing.gender === 'female') &&
                      <Ionicons
                        name={"female-outline"}
                        size={16}
                        color={'pink'}
                      />}
                    {(listing.gender === 'non-binary') &&
                      <Ionicons
                        name={"male-female-outline"}
                        size={16}
                        color={'green'}
                      />}
                  </View>
                </View>
                <Text style={{color: 'blue', fontSize: 14, paddingBottom: 2}}>
                  Contact: {listing.contact}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={[styles.text, {fontSize: 25}]}>
          {listing.first_name} prefers roommates who are:
        </Text>
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
          maxWidth: 470,
          maxHeight: isWeb ? undefined : 32,
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            height: 30
          }}>
            {listing.tags[0].split(',').map((item) => (
              <View style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 5
              }}
              key={item}>
              <Text style={[styles.text,{fontWeight: 'bold', paddingHorizontal: 20}]}>
                {item}
              </Text>
            </View>
          ))}
          </View>
        </ScrollView>
        <ScrollView>
          <View style={{
            maxWidth: 470,
            marginBottom: 5}}>
            <Text style={{color: theme.TEXT_COLOR, width: '100%',flexWrap: 'wrap'}}>
              {listing.bio}
            </Text>
          </View>
        </ScrollView>
        <Text style={{color: theme.TEXT_COLOR}}>
          Last updated: {
            Math.floor((Date.now() - Date.parse(listing.updatedAt)) / (1000*60*60*24))
          } days ago
        </Text>
        </View>
      </BlurredPopup>
    );
}

const styles = StyleSheet.create({
  text: {
		color: theme.TEXT_COLOR,
		fontSize: 15
	},
  popupImages: {
    backgroundColor: "#D9D9D9",
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  }
});