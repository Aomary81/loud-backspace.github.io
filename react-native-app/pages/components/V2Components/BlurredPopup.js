import * as React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { BlurView } from 'expo-blur';
import { Appearance } from "react-native";

import theme from '../../../styles/theme.style'

export default function BlurredPopup(props){
    return (
        <BlurView  intensity={100} 
            tint={Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'}
            style={styles.blurr}>
            <View style={styles.content}>
                <TouchableOpacity style={styles.exitButton} onPress={props.onExitPress}>
                    <Ionicons
                      name={"close-outline"}
                      size={30}
                      color={'black'}
                    />
                </TouchableOpacity>
                {props.children}
            </View>
        </BlurView>
    );
}

const styles = StyleSheet.create({
    blurr: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.BACKGROUND_COLOR+'e0',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    content: {
        height: '60%',
        aspectRatio: 1.5,
        backgroundColor: theme.CONTAINER_COLOR,
        borderRadius: 10,
        borderWidth: 10,
        borderColor: theme.CONTAINER_COLOR
    },
    exitButton: {
        backgroundColor: theme.CONTAINER_COLOR,
        position: 'absolute',
        top: '2%',
        right: '1%',
        borderRadius: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});