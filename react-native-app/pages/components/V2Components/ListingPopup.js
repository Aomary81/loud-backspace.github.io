import {
    StyleSheet,
    Text,
    View,
    ScrollView,
  } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import React, { useState } from "react";
import theme from '../../../styles/theme.style';
import BlurredPopup from './BlurredPopup';

export default function ListingPopup({listing, hidePopup}){
    return (
        <BlurredPopup onExitPress={() => hidePopup(false)}>
        <View style={{
          height: '37%',
          width: '90%',
          flexDirection: 'row',
          marginBottom: 4,
          marginLeft: 5,
          marginTop: 5}}>
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
              {`${listing.city}, ${listing.zip_code}`}
              </Text>
            <Text style={[styles.text, {fontSize: 16, paddingBottom: 2}]}>{listing.street_name}</Text>
            <Text style={[styles.text, {fontSize: 16, paddingBottom: 2}]}>{listing.rent}</Text>
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
        <Text style={[styles.text, {fontSize: 25, paddingLeft: 8}]}>
          {listing.first_name} prefers roommates who are:
        </Text>
        <ScrollView horizontal={true}  showsHorizontalScrollIndicator={false} style={{
          width: '98%',
          paddingVertical: 5,
          paddingHorizontal: 5
        }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 40
          }}>
            {listing.tags[0].split(',').map((item) => (
              <View style={{
                backgroundColor: theme.BACKGROUND_COLOR,
                height: '100%',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 4
              }}
              key={item}>
              <Text style={[styles.text,{fontWeight: 'bold', paddingHorizontal: 20}]}>
                {item}
              </Text>
            </View>
          ))}
          </View>
        </ScrollView>
        <View style={{height: '34%', paddingTop: 5, paddingLeft: 8}}>
          <Text style={{color: theme.TEXT_COLOR}}>
            {listing.bio}
          </Text>
        </View>
        <Text style={{color: theme.TEXT_COLOR, marginBottom: 5, marginLeft: 8}}>
          Last updated: {
            Math.floor((Date.now() - Date.parse(listing.updatedAt)) / (1000*60*60*24))
          } days ago
        </Text>
      </BlurredPopup>
    );
}

const styles = StyleSheet.create({
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