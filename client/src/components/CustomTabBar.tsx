import React, {useEffect, useRef} from 'react';
import {View, Text, Dimensions, Pressable, Animated} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import HomeIcon from './icons/HomeIcon';
import NetworkIcon from './icons/NetworkIcon';
import PostIcon from './icons/PostIcon';
import NotificationIcon from './icons/NotificationIcon';
import JobIcon from './icons/JobIcon';

let previousLabelIndex: number;
let previousBorderIndex: number;

const {width} = Dimensions.get('screen');

type TabBarIconName = {
  [key: string]: (color: string) => JSX.Element;
};

const tabIcons: TabBarIconName = {
  Home: (color: string) => <HomeIcon color={color} />,
  'My Network': (color: string) => <NetworkIcon color={color} />,
  Post: (color: string) => <PostIcon color={color} />,
  Notifications: (color: string) => <NotificationIcon color={color} />,
  Jobs: (color: string) => <JobIcon color={color} />,
};

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): React.JSX.Element {
  // Create animated values for each tab
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    // Animate the border when the tab is focused
    state.routes.forEach((route, index) => {
      previousBorderIndex = state.index > 4 ? previousBorderIndex : state.index;
      Animated.timing(animatedValues[index], {
        toValue: previousBorderIndex === index ? 1 : 0,
        duration: 300, // Animation duration (in ms)
        useNativeDriver: false,
      }).start();
    });
  }, [state.index, state.routes, animatedValues]);

  return (
    <View className="flex-row justify-around bg-white">
      {state.routes
        .filter(
          route => route.name !== 'DetailSearch' && route.name !== 'Profile',
        )
        .map((route, index) => {
          const {options} = descriptors[route.key];
          previousLabelIndex =
            state.index > 4 ? previousLabelIndex : state.index;

          // Handle label as string or function
          const label =
            typeof options.tabBarLabel === 'function'
              ? options.tabBarLabel({
                  focused: previousLabelIndex === index,
                  color: '#000',
                  position: 'below-icon',
                  children: '',
                })
              : options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = previousLabelIndex === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconColor = isFocused ? '#000' : '#8c8c8c';

          const animatedBorderColor = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: ['#eaeaea', '#000'],
          });

          const animatedBorderWidth = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0, 2],
          });

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              className="flex-1 items-center justify-center p-2 border-t border-[#eaeaea]">
              <Animated.View
                style={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  borderTopColor: animatedBorderColor,
                  borderTopWidth: animatedBorderWidth,
                }}
              />
              {tabIcons[route.name](iconColor)}

              <Text
                className="font-medium"
                style={{color: iconColor, fontSize: width * 0.026}}>
                {typeof label === 'string' ? label : ''}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
}
