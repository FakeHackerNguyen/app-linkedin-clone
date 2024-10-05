import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type MyNetworkProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MyNetwork({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: MyNetworkProps): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text>My Network</Text>
    </SafeAreaView>
  );
}
