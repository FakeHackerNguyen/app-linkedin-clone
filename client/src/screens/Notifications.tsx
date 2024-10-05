import React from 'react';
import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type NotificationProps = {
  query: string;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Notifications({
  query,
  isSearchFocus,
  setIsSearchFocus,
}: NotificationProps): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text>Notifications</Text>
    </SafeAreaView>
  );
}
