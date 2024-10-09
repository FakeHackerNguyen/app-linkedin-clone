import React from 'react';
import {
  Dimensions,
  Image,
  View,
  TextInput,
  Pressable,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchIcon from './icons/SearchIcon';
import ChatIcon from './icons/ChatIcon';
import EditIcon from './icons/EditIcon';
import BackIcon from './icons/BackIcon';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useSelector} from 'react-redux';
import {Store} from '../redux/store';

const {width, height} = Dimensions.get('screen');

type CustomHeaderDrawerProps = {
  navigation: DrawerNavigationProp<any>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isSearchFocus: boolean;
  setIsSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CustomHeaderDrawer({
  navigation,
  query,
  setQuery,
  isSearchFocus,
  setIsSearchFocus,
}: CustomHeaderDrawerProps): React.JSX.Element {
  const {user} = useSelector((state: Store) => state.auth);

  return (
    <SafeAreaView className="bg-white">
      <View
        className="px-4 py-2 flex-row items-center justify-between border-b border-[#eaeaea]"
        style={{height: height * 0.05}}>
        {isSearchFocus ? (
          <Pressable
            onPress={() => {
              setIsSearchFocus(false);
              setQuery('');
              Keyboard.dismiss();
              if (navigation.canGoBack()) {
                navigation.goBack();
              }
            }}>
            <BackIcon />
          </Pressable>
        ) : (
          <Pressable onPress={() => navigation.openDrawer()}>
            <Image
              style={{width: width * 0.08, height: width * 0.08}}
              className="rounded-full"
              source={{
                uri: user?.avatar.url,
              }}
            />
          </Pressable>
        )}
        <View className="flex-row items-center bg-[#eff3f7] rounded-[5px] py-0 px-2">
          {!isSearchFocus ? <SearchIcon /> : null}
          <TextInput
            onFocus={() => setIsSearchFocus(true)}
            placeholder="Search"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={(value: string) => setQuery(value)}
            className="bg-[#EFF3F7] py-0 px-1 font-medium"
            style={{
              width: isSearchFocus ? width * 0.6 : width * 0.55,
              height: height * 0.03,
            }}
          />
        </View>
        <View className="flex-row gap-3">
          <Pressable>
            <EditIcon />
          </Pressable>
          <Pressable>
            <ChatIcon />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
