import React, {useState} from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import AppBottomNavigator from './BottomNavigation';
import CustomDrawer from '../components/CustomDrawer';
import CustomHeaderDrawer from '../components/CustomHeaderDrawer';

const Drawer = createDrawerNavigator();

const renderCustomDrawer = (props: DrawerContentComponentProps) => {
  return <CustomDrawer {...props} />;
};

const renderCustomDrawerHeader = (
  props: any,
  query: string,
  setQuery: React.Dispatch<React.SetStateAction<string>>,
  isSearchFocus: boolean,
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <CustomHeaderDrawer
      {...props}
      isSearchFocus={isSearchFocus}
      query={query}
      setIsSearchFocus={setIsSearchFocus}
      setQuery={setQuery}
    />
  );
};

export default function AppDrawerNavigator(): React.JSX.Element {
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="MainTabs"
        options={{
          header: props =>
            renderCustomDrawerHeader(
              props,
              query,
              setQuery,
              isSearchFocus,
              setIsSearchFocus,
            ),
        }}>
        {props => (
          <AppBottomNavigator
            {...props}
            query={query}
            setQuery={setQuery}
            isSearchFocus={isSearchFocus}
            setIsSearchFocus={setIsSearchFocus}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
