import React, {useState} from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import NetworkIcon from '../../../components/icons/NetworkIcon';
import {NativeStackNavigationProp} from 'react-native-screens/lib/typescript/native-stack/types';
import {TabParamList} from '../../../navigation/BottomNavigation';
import BackIcon from '../../../components/icons/BackIcon';

const {width} = Dimensions.get('screen');

type ManageMyNetworkProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'Manage My Network'>;
};

export default function ManageMyNetwork({
  navigation,
}: ManageMyNetworkProps): React.JSX.Element {
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
            Manage my network
          </Text>
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Connection')}
        className="bg-white p-3.5 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <NetworkIcon color="#666" width={30} height={30} />
          <Text
            className="text-[#666] font-bold ml-3"
            style={{
              fontSize: width * 0.035,
            }}>
            Connections
          </Text>
        </View>
        <Text
          style={{
            fontSize: width * 0.035,
          }}
          className="text-[#666] font-bold">
          2
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}
