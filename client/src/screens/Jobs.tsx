import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type JobProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Jobs({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: JobProps): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text>Jobs</Text>
    </SafeAreaView>
  );
}
