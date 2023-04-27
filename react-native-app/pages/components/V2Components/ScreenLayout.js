import * as React from 'react';
import {View, Platform, useWindowDimensions, StatusBar, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native';
import theme from '../../../styles/theme.style'
import { Appearance } from "react-native";

const isWeb = Platform.OS === "web";

export default function ScreenLayout(props){
  const mode = Appearance.getColorScheme();
  const {width} = useWindowDimensions();
  return(
    (isWeb ? 
      (<View style={[styles.background,{
      paddingHorizontal: (width > 500 ? (width > 900 ? 0 : 25) : 0)
      }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}/>
        <View style={[styles.container, {
          width: (width > 900 ? '79%' : '100%'),
          justifyContent: 'flex-start',
        }]}>
          {props.children}
        </View>
      </View>)
    : 
    (<SafeAreaView style={[styles.background,{
      paddingHorizontal: (width > 500 ? (width > 900 ? 0 : 25) : 0)
      }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}/>
      <View style={[styles.container, {
        width: (width > 900 ? '79%' : '100%'),
        justifyContent: 'flex-start',
        }]}>
        {props.children}
      </View>
    </SafeAreaView>)
    )
  );
}

const styles = StyleSheet.create({
  background: {
    flexGrow: 1,
    backgroundColor: theme.BACKGROUND_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.CONTAINER_COLOR,
    borderRadius: 10,
    borderWidth: 5,
    borderColor: theme.CONTAINER_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
})