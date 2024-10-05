import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, FlatList, Pressable, Text, View} from 'react-native';
import SearchIcon from './icons/SearchIcon';
import {searchCommon} from '../api/searchApi';

const {width, height} = Dimensions.get('screen');
type ListSearchProps = {
  query: string;
};

type User = {
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
  experiences: Array<{
    jobTitle: string;
  }>;
  educations: Array<{}>;
};

type SearchResult = {
  type: string;
  name: string;
  fullName: string;
  avatar: {
    url: string;
    public_id: string;
  };
  industry: string;
  location: string;
};

export default function ListSearch({
  query,
}: ListSearchProps): React.JSX.Element {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handleChange = async () => {
      const res = await searchCommon(query);

      const data = res!.data;
      if (data) {
        return setSearchResults(data);
      }
    };

    handleChange();
  }, [query]);

  console.log(searchResults);

  return (
    <View className="bg-[#eaeaea] w-full h-full">
      <FlatList
        className="bg-white"
        data={searchResults}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <Pressable className="flex-row items-center px-7 py-5">
            <SearchIcon />
            {item.type === 'Company' && (
              <View className="flex-row items-center gap-2 flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium">
                  {item.name}{' '}
                  <Text className="text-[#676767]">
                    • Company • {item.industry}
                  </Text>
                </Text>
              </View>
            )}
            {item.type === 'University' && (
              <View className="flex-row items-center gap-2 flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium">
                  {item.name}{' '}
                  <Text className="text-[#676767]">
                    • School • {item.location}
                  </Text>
                </Text>
              </View>
            )}
            {item.type === 'User' && (
              <View className="flex-row items-center gap-2 flex-1">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="pl-7 text-black font-medium">
                  {item.fullName}{' '}
                  {/* <Text className="text-[#676767]">
                    • School • {item.location}
                  </Text> */}
                </Text>
              </View>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
