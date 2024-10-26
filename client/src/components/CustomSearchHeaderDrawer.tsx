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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, Store} from '../redux/store';
import {changeQuerySearch, focusSearch} from '../redux/reducers/searchReducer';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

type CustomSearchHeaderDrawerProps = {
  // navigation: DrawerNavigationProp<any>;
};

export default function CustomSearchHeaderDrawer({}: // navigation,
CustomSearchHeaderDrawerProps): React.JSX.Element {
  const {user} = useSelector((state: Store) => state.auth);
  const {isSearchFocus, query} = useSelector((state: Store) => state.search);
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <SafeAreaView className="bg-white">
      <View
        className="px-4 py-2 flex-row items-center justify-between border-b border-[#eaeaea]"
        style={{height: height * 0.05}}>
        {isSearchFocus || query.length > 0 ? (
          <Pressable
            onPress={() => {
              dispatch(focusSearch(false));
              Keyboard.dismiss();

              if (navigation.canGoBack() && !isSearchFocus) {
                dispatch(changeQuerySearch(''));
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
          {!isSearchFocus ? (
            <SearchIcon width={13} height={13} color="#676767" />
          ) : null}
          <TextInput
            onFocus={() => dispatch(focusSearch(true))}
            placeholder="Search"
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
            value={query}
            onChangeText={(value: string) => dispatch(changeQuerySearch(value))}
            className="bg-[#EFF3F7] py-0 px-1.5 font-medium"
            style={{
              width: isSearchFocus ? width * 0.6 : width * 0.55,
              height: height * 0.03,
            }}
          />
        </View>
        <View className="flex-row gap-3">
          <Pressable>
            <EditIcon width={20} height={25} />
          </Pressable>
          <Pressable>
            <ChatIcon />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
