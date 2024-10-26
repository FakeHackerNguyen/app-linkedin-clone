import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import SearchIcon from '../../../components/icons/SearchIcon';
import OptionsIcon from '../../../components/icons/OptionsIcon';
import Connection from './Connection';
import BackIcon from '../../../components/icons/BackIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabParamList} from '../../../navigation/BottomNavigation';

const {width} = Dimensions.get('screen');
type ConnectionProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'Connection'>;
};

export default function Connections({
  navigation,
}: ConnectionProps): React.JSX.Element {
  const [searchPressed, setSearchPressed] = useState(false);
  const [optionsPressed, setOptionsPressed] = useState(false);
  const [backPressed, setBackPressed] = useState(false);

  return (
    <SafeAreaView className="bg-[#eaeaea] flex-1">
      <View className="relative flex-row items-center bg-white px-2 py-3 border-b border-[#eaeaea]">
        <Pressable
          onPressIn={() => setBackPressed(true)}
          onPressOut={() => setBackPressed(false)}
          onPress={() => navigation.goBack()}
          className="absolute pl-4">
          <BackIcon
            width={40}
            height={40}
            color={backPressed ? 'gray' : '#666'}
          />
        </Pressable>
        <View className="flex-1 items-center">
          <Text
            style={{
              fontSize: width * 0.05,
            }}
            className="text-black font-extrabold">
            Connections
          </Text>
        </View>
      </View>
      <View className="bg-white flex-row items-center justify-between px-3 border-b border-[#eaeaea]">
        <Text
          className="text-[#666] font-semibold"
          style={{
            fontSize: width * 0.04,
          }}>
          2 connections
        </Text>
        <View className="flex-row items-center">
          <Pressable
            style={{
              backgroundColor: searchPressed ? '#eaeaea' : 'transparent',
            }}
            onPressIn={() => setSearchPressed(true)}
            onPressOut={() => setSearchPressed(false)}
            className="px-2 py-5">
            <SearchIcon width={15} height={15} color="#676767" />
          </Pressable>
          <Pressable
            style={{
              backgroundColor: optionsPressed ? '#eaeaea' : 'transparent',
            }}
            onPressIn={() => setOptionsPressed(true)}
            onPressOut={() => setOptionsPressed(false)}
            className="px-2 py-5">
            <OptionsIcon width={15} height={15} />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={[1, 2]}
        renderItem={({item}) => <Connection data={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
