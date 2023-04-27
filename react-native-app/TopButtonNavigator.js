import * as React from 'react';
import { Text, View , Image, useWindowDimensions, Appearance} from 'react-native';
import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory
} from '@react-navigation/native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import theme from './styles/theme.style'

function TopButtonNavigator({
  initialRouteName,
  children,
  screenOptions,
  tabBarStyle,
  contentStyle,
}) {
const { state, navigation, descriptors, NavigationContent } =
  useNavigationBuilder(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });

  const {height, width, aspectRatio} = useWindowDimensions();
  const colorScheme = Appearance.getColorScheme();
  const logo = colorScheme === 'dark' ?
  require('./assets/logo/logo_dark.png') :
  require('./assets/logo/logo_light.png');
  const backgroundColor = theme.BACKGROUND_COLOR;
  
  return (
    <NavigationContent>
      <View style={{
        backgroundColor: backgroundColor,
        height: (width > 900 ? 120 : 83),
        borderBottomWidth: 10,
        borderBottomColor: 'transparent'
        }}>
        <View style={{width: (width > 900 ? '79%' : '100%'),
          height: (width > 900 ? '50%' : '25%'),
          flexDirection: 'column-reverse',
          alignItems: 'flex-start',
          alignSelf: 'center',
          backgroundColor: backgroundColor,
          paddingHorizontal: (width > 500 ? (width > 900 ? 0 : 25) : 0)
          }}>
          <Image
            style={{height: '80%', aspectRatio: 6800/1308, resizeMode: 'stretch'}}
            source={logo}
          />
        </View>
        <View style={[{
          flexDirection: 'row',
          width: (width > 900 ? '79%' : '100%'),
          paddingHorizontal: (width > 500 ? (width > 900 ? 0 : 25) : 0),
          height: (width > 900 ? '50%' : '75%'),
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: 5,
          backgroundColor: backgroundColor
          }, tabBarStyle]}>
          {state.routes.map((route, i) => (
            <TouchableOpacity
              key={route.key}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!event.defaultPrevented) {
                  navigation.dispatch({
                    ...TabActions.jumpTo(route.name),
                    target: state.key,
                  });
                }
              }}
            
              activeOpacity={1}
              style={[{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                left: descriptors[route.key].options.end ?
                  ((width > 1030) ? (width*0.79)-727 : 0) :
                  0,
                backgroundColor: state.index == i ?
                 descriptors[route.key].options.onColor :
                 descriptors[route.key].options.offColor,
                marginVertical: 5,
                marginRight: 10,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5
              }, descriptors[route.key].options.buttonStyles]}
            >
              {descriptors[route.key].options.buttonIcon({focused: state.index == i})}
              {width > 1030 && <Text style={{
                fontFamily: 'Inter',
                fontSize: 16,
                paddingLeft: 4
                }}>
                  {descriptors[route.key].options.title || route.name}</Text>}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={
        [{
            flexGrow: 1, 
            alignItems: 'center',
            backgroundColor: backgroundColor,
          }, contentStyle
        ]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={
                { 
                  display: i === state.index ? 'flex' : 'none',
                  width: '100%',
                  flexGrow: 1
                }
              }
            >
              {descriptors[route.key].render()}
            </View>
          );
        })}
      </View>
    </NavigationContent>
  );
}

export const createTopButtonNavigator = createNavigatorFactory(TopButtonNavigator);