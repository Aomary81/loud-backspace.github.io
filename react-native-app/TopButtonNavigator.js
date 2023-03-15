import * as React from 'react';
import { Text, View , Image, useWindowDimensions, Appearance } from 'react-native';
import {
  useNavigationBuilder,
  TabRouter,
  TabActions,
  createNavigatorFactory
} from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
        height: 120,
        borderBottomWidth: 10,
        borderBottomColor: backgroundColor
      }}>
        <View style={{width: '79%',
          height: '50%',
          flexDirection: 'column-reverse',
          alignItems: 'flex-start',
          alignSelf: 'center',
          backgroundColor: backgroundColor
          }}>
          <Image
            style={{height: '80%', aspectRatio: 6800/1308, resizeMode: 'stretch'}}
            source={logo}
          />
        </View>
        <View style={[{
          flexDirection: 'row',
          width: '80%',
          height: '50%',
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
                  ((width > 1030) ? (width*0.79)-816 : 0) :
                  0,
                backgroundColor: state.index == i ?
                 descriptors[route.key].options.onColor :
                 descriptors[route.key].options.offColor,
                margin: 5,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 5
              }, descriptors[route.key].options.buttonStyles]}
            >
              {descriptors[route.key].options.buttonIcon({focused: state.index == i})}
              {width > 1030 && <Text style={{
                fontWeight: 'bold',
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
            flex: 1, 
            alignItems: 'center',
            backgroundColor: backgroundColor
          }, contentStyle
        ]}>
        {state.routes.map((route, i) => {
          return (
            <View
              key={route.key}
              style={
                { 
                  display: i === state.index ? 'flex' : 'none',
                  flex: 1,  
                  width: '79%',
                  backgroundColor: backgroundColor
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