import React, {useRef, useState} from 'react';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import PostTab from '../screens/PostTab';
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
import {Company, School, User} from '../types';
import NetworkNavigator from './NetworkNavigator';

const {height} = Dimensions.get('screen');

export type TabParamList = {
  Home: undefined;
  'My Network': undefined;
  Post: undefined;
  Notifications: undefined;
  Jobs: undefined;
  DetailSearch: {
    i: {
      type: string;
      data: User | Company | School | string;
    };
  };
  Profile: {idUser: string};
  'Manage My Network': undefined;
  Connection: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type AppBottomNavigatorProps = {};

const renderCustomTabBar = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

export default function AppBottomNavigator({}: AppBottomNavigatorProps): React.JSX.Element {
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
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        tabBar={renderCustomTabBar}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="My Network" component={NetworkNavigator} />

        <Tab.Screen
          name="Post"
          component={PostTab}
          listeners={{
            tabPress: e => {
              e.preventDefault();
              openModal();
            },
          }}
        />
        <Tab.Screen name="Notifications" component={Notifications} />
        <Tab.Screen name="Jobs" component={Jobs} />
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
