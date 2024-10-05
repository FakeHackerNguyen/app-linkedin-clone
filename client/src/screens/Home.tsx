import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Store} from '../redux/store';
import {useSelector} from 'react-redux';
import ListSearch from '../components/ListSearch';

type HomeProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Home({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: HomeProps): React.JSX.Element {
  const {user} = useSelector((state: Store) => state.auth);

  return (
    <SafeAreaView className="bg-white flex-1">
      {isSearchFocus ? <ListSearch query={query} /> : <Text>Home</Text>}
    </SafeAreaView>
  );
}
