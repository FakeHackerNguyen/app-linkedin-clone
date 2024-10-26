import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import AppBottomNavigator from './BottomNavigation';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const renderCustomDrawer = (props: DrawerContentComponentProps) => {
  return <CustomDrawer {...props} />;
};

// const renderSearchHeader = (
//   props: any,
//   query: string,
//   setQuery: React.Dispatch<React.SetStateAction<string>>,
//   isSearchFocus: boolean,
//   setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {
//   return (
//     <CustomSearchHeaderDrawer
//       {...props}
//       isSearchFocus={isSearchFocus}
//       query={query}
//       setIsSearchFocus={setIsSearchFocus}
//       setQuery={setQuery}
//     />
//   );
// };

export default function AppDrawerNavigator(): React.JSX.Element {
  return (
    <Drawer.Navigator
      drawerContent={renderCustomDrawer}
      screenOptions={{
        drawerType: 'slide',
      }}>
      <Drawer.Screen
        name="MainTabs"
        options={{
          headerShown: false,
        }}
        component={AppBottomNavigator}
      />
      {/* <Drawer.Screen
        name="MainTabs"
        options={{
          headerShown: false,
          // header: props => null,
          // renderSearchHeader(
          //   props,
          //   query,
          //   setQuery,
          //   isSearchFocus,
          //   setIsSearchFocus,
          // ),
        }}>
        {props => <AppBottomNavigator {...props} />}
      </Drawer.Screen> */}
    </Drawer.Navigator>
  );
}
