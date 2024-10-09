import React, {SetStateAction, useRef, useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Post from '../screens/Post';
import MyNetwork from '../screens/MyNetwork';
import Jobs from '../screens/Jobs';
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomTabBar from '../components/CustomTabBar';
import DetailSearch from '../screens/features/search/DetailSearch';
import Profile from '../screens/features/user/Profile';
import CreatingPostModal from '../components/CreatingPostModal';

const {height} = Dimensions.get('screen');

export type TabParamList = {
  Home: undefined;
  'My Network': undefined;
  Post: undefined;
  Notifications: undefined;
  Jobs: undefined;
  DetailSearch: undefined;
  Profile: {idUser: string};
};

const Tab = createBottomTabNavigator<TabParamList>();

type AppBottomNavigatorProps = {
  query: string;
  setQuery: React.Dispatch<SetStateAction<string>>;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

const renderCustomTabBar = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

export default function AppBottomNavigator({
  query,
  setQuery,
  isSearchFocus,
  setIsSearchFocus,
}: AppBottomNavigatorProps): React.JSX.Element {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

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
              setQuery={setQuery}
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
        <Tab.Screen
          name="Post"
          component={Post}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              openModal();
            },
          }}
        />
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

        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="DetailSearch" component={DetailSearch} />
      </Tab.Navigator>
      <CreatingPostModal
        slideAnim={slideAnim}
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
      />
    </KeyboardAvoidingView>
  );
}
