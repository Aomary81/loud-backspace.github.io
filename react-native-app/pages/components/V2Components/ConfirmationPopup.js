import {
    StyleSheet,
    Text,
    View,
    useWindowDimensions,
    Platform,
    TouchableOpacity
  } from "react-native";
import React, { useState } from "react";
import theme from '../../../styles/theme.style';
import BlurredPopup from './BlurredPopup';

export default function ConfirmationPopup({hidePopup, confirm, text}){
    const {width} = useWindowDimensions()
    const isLandscape = width > 700
    const isWeb = Platform.OS ==='web'
    return (
      <BlurredPopup>
        <View style={{margin: 10,
          maxWidth: isLandscape ? undefined : 280,
          alignItems: 'center',
          justifyContent: 'center'
          }}>
            <View>
              <Text style={{color: theme.TEXT_COLOR, fontWeight: 'bold'}}>{text}</Text>
            </View>
            <View style={{height: 40,
              width: 220,
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-around'
              }}>
                <TouchableOpacity onPress={() => hidePopup(false)}
                  style={{height: 25,
                    width: 60,
                    backgroundColor: '#AFD2FF',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirm}
                  style={{height: 25,
                    width: 60,
                    backgroundColor: '#FFAAAA',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'}}>
                    <Text>Yes</Text>
                </TouchableOpacity>
            </View>
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
    backgroundColor: theme.TEXT_COLOR,
    aspectRatio: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2
  }
});