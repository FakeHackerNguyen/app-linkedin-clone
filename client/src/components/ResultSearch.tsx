import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList, Image, Pressable, Text, View} from 'react-native';
import SearchIcon from './icons/SearchIcon';
import {searchCommon} from '../api/searchApi';
import {Company, School, User} from '../types';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {TabParamList} from '../navigation/BottomNavigation';

const {width} = Dimensions.get('screen');
type ResultSearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

type Result = {
  type: string;
  data: User | Company | School;
};

type NavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>;

export default function ResultSearch({
  query,
  setQuery,
}: ResultSearchProps): React.JSX.Element {
  const [results, setResults] = useState<Result[]>([]);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const handleChange = async () => {
      const res = await searchCommon(query);

      const data = res!.data;
      if (data) {
        return setResults(data);
      }
    };

    if (query) {
      handleChange();
    }
  }, [query]);

  console.log(results);

  return (
    <View className="bg-[#eaeaea] w-full h-full">
      <FlatList
        className="bg-white"
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable
            onPress={() => {
              if (item.type === 'Company' || item.type === 'University') {
                setQuery((item.data as Company | School).name);
              } else if (item.type === 'User') {
                setQuery((item.data as User).fullName);
              }
              navigation.navigate('DetailSearch');
            }}
            className="flex-row items-center px-7 py-5">
            <SearchIcon />
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
          </Pressable>
        )}
      />
    </View>
  );
}
