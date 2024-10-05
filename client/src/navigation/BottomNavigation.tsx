import React from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Post from '../screens/Post';
import MyNetwork from '../screens/MyNetwork';
import Jobs from '../screens/Jobs';
import {KeyboardAvoidingView, Platform} from 'react-native';
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

type AppBottomNavigatorProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderCustomTabBar = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

export default function AppBottomNavigator({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: AppBottomNavigatorProps): React.JSX.Element {
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={renderCustomTabBar}>
        <Tab.Screen name="Home">
          {props => (
            <Home
              {...props}
              query={query}
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="My Network">
          {props => (
            <MyNetwork
              {...props}
              query={query}
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Post">
          {props => (
            <Post
              {...props}
              query={query}
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Notifications">
          {props => (
            <Notifications
              {...props}
              query={query}
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Jobs">
          {props => (
            <Jobs
              {...props}
              query={query}
              isSearchFocus={isSearchFocus}
              setIsSearchFocus={setIsSearchFocus}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
