import * as React from 'react';
import {View, StyleSheet, TouchableOpacity, Platform, useWindowDimensions} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from 'expo-blur';
import { Appearance } from "react-native";

import theme from '../../../styles/theme.style'
import { SafeAreaView } from 'react-navigation';

export default function BlurredPopup(props){
    const {width} = useWindowDimensions()
    const isWeb = Platform.OS ==='web'
    return (
        <SafeAreaView>
        <BlurView  intensity={100}
            tint={Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'}
            style={styles.blurr}>
            <View style={[styles.content,{height: isWeb ? undefined : '90%'}]}>
                { props.onExitPress && <TouchableOpacity style={styles.exitButton} onPress={props.onExitPress}>
                    <Ionicons
                        name={"close-outline"}
                        size={30}
                        color={'black'}
                    />
                </TouchableOpacity>}
                {props.children}
            </View>
        </BlurView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    blurr: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.BACKGROUND_COLOR+'e0',
        zIndex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    content: {
        backgroundColor: theme.CONTAINER_COLOR,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.TEXT_COLOR,
    },
    exitButton: {
        backgroundColor: theme.CONTAINER_COLOR,
        position: 'absolute',
        top: 5,
        right: 5,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    }
});