import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type PostProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Post({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: PostProps): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text>Post</Text>
    </SafeAreaView>
  );
}
