import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResultSearch from '../components/ResultSearch';

type HomeProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Home({
  // setIsSearchFocus,
  query,
  setQuery,
  isSearchFocus,
}: HomeProps): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      {isSearchFocus ? (
        <ResultSearch query={query} setQuery={setQuery} />
      ) : (
        <Text>Home</Text>
      )}
    </SafeAreaView>
  );
}
