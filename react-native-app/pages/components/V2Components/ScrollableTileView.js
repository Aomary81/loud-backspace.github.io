import * as React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';

/**
ScrollableTileView is a tile system that is scrollable, it can be vertical or horizontal based
on whether or not you pass true to horizontal, default is vertical. Number of columns can be changed with
columns, not supported for horizontal. There is example use code on the bottom.

//*/
const ScrollableTileView = ({ components, numColumns, style, onItemPress, horizontal}) => {
	const renderItem = ({ item, index }) => {
	  return (
		<TouchableOpacity style={styles.item}
		onPress={() => onItemPress(item.id)}>
		  	{item.item}
		</TouchableOpacity>
	  );
	};
	return (
		<View style={
			Object.assign
			(
				{
                    alignContent: 'flex-start',
                    borderRadius: 10,
					borderWidth: 5,
                    backgroundColor: '#F3F3F3',
					borderColor: '#F3F3F3'
				}, 
				style
			)
		}>
			<FlatList
				horizontal={horizontal}
        		data={components}
        		numColumns={numColumns}
        		renderItem={renderItem}
        		keyExtractor={(item, index) => index.toString()}
    		/>
		</View>
	);
}
export default ScrollableTileView;
const styles = StyleSheet.create({
	item: {
	  flex: 1,
	  margin: 3
	},
  });

/* Example use
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Platform} from 'react-native';
import ContentModule from '../components/V2Components/ContentModule';
import ScrollableTileView from '../components/V2Components/ScrollableTileView';

const isWeb = Platform.OS === 'web';
function ChatScreen() {
const [selectedId, setSelectedId] = useState();
let components = [];
let cols = 3;
let numItems = 149;
for(let i = 1; i <= numItems; i++){
  components.push({item: <ContentModule style={{height: isWeb? 150:70, width: '100%'}}>
    <Text>{i}</Text>
  </ContentModule>,
  id: i});
}
for(let i = 1; i <= cols-numItems%cols; i++){
  components.push(<ContentModule style={{height: isWeb? 150:70, width: '100%', backgroundColor: 'transparent'}}>
    
  </ContentModule>);
}
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollableTileView
        style={{height: isWeb? 500:'50%', width: '90%'}}
        components={components}
        numColumns={cols}
        onItemPress={(id) => setSelectedId(id)}
      />
    </View>
  );
}
export default ChatScreen;

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });
*/