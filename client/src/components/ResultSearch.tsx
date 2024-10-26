import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native';
import SearchIcon from './icons/SearchIcon';
import {searchCommon} from '../api/searchApi';
import {Company, School, User} from '../types';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/BottomNavigation';
import {AppDispatch, Store} from '../redux/store';
import {useDispatch, useSelector} from 'react-redux';
import {changeQuerySearch, focusSearch} from '../redux/reducers/searchReducer';

const {width} = Dimensions.get('screen');
type ResultSearchProps = {};

type Result = {
  type: string;
  data: User | Company | School | string;
};

type NavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;

export default function ResultSearch({}: ResultSearchProps): React.JSX.Element {
  const [results, setResults] = useState<Result[]>([]);
  const navigation = useNavigation<NavigationProp>();

  const {query} = useSelector((state: Store) => state.search);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const handleChange = async () => {
      const res = await searchCommon(query);

      const data = res!.data;
      if (data) {
        return setResults(data);
      }
    };

    handleChange();
  }, [query]);

  return (
    <View className="bg-[#eaeaea] w-full h-full">
      <FlatList
        className="bg-white"
        data={results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              if (item.type === 'Company' || item.type === 'University') {
                dispatch(
                  changeQuerySearch((item.data as Company | School).name),
                );
              } else if (item.type === 'User') {
                dispatch(changeQuerySearch((item.data as User).fullName));
              } else if (item.type === 'Suggest') {
                dispatch(changeQuerySearch(item.data as string));
              }
              dispatch(focusSearch(false));
              navigation.navigate('DetailSearch', {i: item});
            }}
            className="flex-row items-center px-7 py-5">
            <SearchIcon color="#676767" width={15} height={15} />
            {item.type === 'Company' && (
              <View className="flex-row items-center flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium flex-1">
                  {(item.data as Company).name}{' '}
                  <Text className="text-[#676767]">
                    • Company • {(item.data as Company).industry}
                  </Text>
                </Text>
                <Image
                  className="w-8 h-8 rounded-full"
                  source={{uri: (item.data as Company).avatar.url}}
                />
              </View>
            )}
            {item.type === 'University' && (
              <View className="flex-row items-center flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium flex-1">
                  {(item.data as School).name}{' '}
                  <Text className="text-[#676767]">
                    • School • {(item.data as School).location}
                  </Text>
                </Text>
                <Image
                  className="w-8 h-8 rounded-full"
                  source={{uri: (item.data as School).avatar.url}}
                />
              </View>
            )}
            {item.type === 'User' && (
              <View className="flex-row items-center flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium flex-1">
                  {(item.data as User).fullName}{' '}
                  {(item.data as User).experiences.length > 0 ? (
                    <Text className="text-[#676767]">
                      • {(item.data as User).experiences[0].jobTitle} at{' '}
                      {(item.data as User).experiences[0].company.name}
                    </Text>
                  ) : (
                    <Text className="text-[#676767]">
                      • Student at{' '}
                      {(item.data as User).educations[0].school.name}
                    </Text>
                  )}
                </Text>
                <Image
                  className="w-8 h-8 rounded-full"
                  source={{uri: (item.data as User).avatar.url}}
                />
              </View>
            )}
            {item.type === 'Suggest' && (
              <View className="flex-row items-center flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium flex-1">
                  {item.data as string}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
