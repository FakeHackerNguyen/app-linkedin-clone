import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {Store} from '../redux/store';
import CustomSearchHeaderDrawer from '../components/CustomSearchHeaderDrawer';
import ResultSearch from '../components/ResultSearch';

type NotificationProps = {
  navigation: DrawerNavigationProp<any>;
};

export default function Notifications({
  navigation,
}: NotificationProps): React.JSX.Element {
  const {isSearchFocus} = useSelector((state: Store) => state.search);

  return (
    <SafeAreaView className="bg-white flex-1">
      <CustomSearchHeaderDrawer navigation={navigation} />
      {isSearchFocus ? <ResultSearch /> : <Text>Notifications</Text>}
    </SafeAreaView>
  );
}
