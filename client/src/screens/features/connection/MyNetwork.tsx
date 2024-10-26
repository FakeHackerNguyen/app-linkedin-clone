import React from 'react';
import {Dimensions, Pressable, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import ResultSearch from '../../../components/ResultSearch';
import NextIcon from '../../../components/icons/NextIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TabParamList} from '../../../navigation/BottomNavigation';
import {useSelector} from 'react-redux';
import {Store} from '../../../redux/store';
import CustomSearchHeaderDrawer from '../../../components/CustomSearchHeaderDrawer';
import {DrawerNavigationProp} from '@react-navigation/drawer';

const {width} = Dimensions.get('screen');

type MyNetworkProps = {
  // navigation: NativeStackNavigationProp<TabParamList, 'My Network'>;
  navigation: DrawerNavigationProp<any>;
};

export default function MyNetwork({
  navigation,
}: MyNetworkProps): React.JSX.Element {
  const {isSearchFocus} = useSelector((state: Store) => state.search);

  return (
    <SafeAreaView className="bg-[#eaeaea] flex-1">
      <CustomSearchHeaderDrawer navigation={navigation} />
      {isSearchFocus ? (
        <ResultSearch />
      ) : (
        <>
          <Pressable
            onPress={() => navigation.navigate('Manage My Network')}
            className="bg-white flex-row items-center justify-between p-4">
            <Text
              className="text-black font-extrabold"
              style={{
                fontSize: width * 0.04,
              }}>
              Manage my network
            </Text>
            <NextIcon width={27} height={15} />
          </Pressable>
          <Pressable className="bg-white flex-row items-center justify-between p-4 mt-2">
            <Text
              className="text-black font-extrabold"
              style={{
                fontSize: width * 0.04,
              }}>
              Invitations
            </Text>
            <NextIcon width={27} height={15} />
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}
