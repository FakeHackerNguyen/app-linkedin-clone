import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Company, School, User} from '../../../types';
import {searchCommon} from '../../../api/searchApi';
import {RouteProp} from '@react-navigation/native';
import {TabParamList} from '../../../navigation/BottomNavigation';
import ConnectIcon from '../../../components/icons/ConnectIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import SendIcon from '../../../components/icons/SendIcon';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const {width} = Dimensions.get('screen');

type Result = {
  type: string;
  data: User | Company | School | string;
};

type DetailSearchProps = {
  navigation: NativeStackNavigationProp<TabParamList, 'DetailSearch'>;
  route: RouteProp<TabParamList, 'DetailSearch'>;
};

export default function DetailSearch({
  navigation,
  route,
}: DetailSearchProps): React.JSX.Element {
  const {i} = route.params;
  const [results, setResults] = useState<Result[]>([]);
  const [effectBlueButton, setEffectBlueButton] = useState(false);
  const [effectTransparentButton, setEffectTransparentButton] = useState(false);

  console.log(results);

  useEffect(() => {
    const searchQuery = async () => {
      if (i.type === 'Suggest') {
        const res = await searchCommon(i.data as string);

        const data = res!.data;
        if (data) {
          return setResults(data);
        }
      }
    };

    searchQuery();
  }, [i]);

  return (
    <SafeAreaView className="bg-[#eaeaea] flex-1">
      <View className="bg-white mt-2 p-4">
        <Pressable
          className="flex-row"
          onPress={() =>
            navigation.navigate('Profile', {idUser: (i.data as User)._id})
          }>
          {i.type === 'User' && (
            <>
              <Image
                className="w-[60px] h-[60px] rounded-full"
                source={{uri: (i.data as User).avatar.url}}
              />
              <View className="ml-2">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.05,
                  }}
                  className="text-black font-extrabold">
                  {(i.data as User).fullName}
                </Text>
                {(i.data as User).experiences.length > 0 ? (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: width * 0.037,
                    }}
                    className="text-black font-medium">
                    {(i.data as User).experiences[0].jobTitle} at{' '}
                    {(i.data as User).experiences[0].company.name}
                  </Text>
                ) : (
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      fontSize: width * 0.037,
                    }}
                    className="text-black font-medium">
                    Student at {(i.data as User).educations[0].school.name}
                  </Text>
                )}
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="text-[#676767] font-medium">
                  {(i.data as User).location}
                </Text>
              </View>
            </>
          )}
          {i.type === 'Company' && (
            <>
              <Image
                className="w-[60px] h-[60px] rounded-full"
                source={{uri: (i.data as Company).avatar.url}}
              />
              <View className="ml-2">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.05,
                  }}
                  className="text-black font-extrabold">
                  {(i.data as Company).name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.037,
                  }}
                  className="text-black font-medium">
                  {(i.data as Company).industry}
                </Text>
              </View>
            </>
          )}
          {i.type === 'University' && (
            <>
              <Image
                className="w-[60px] h-[60px] rounded-full"
                source={{uri: (i.data as School).avatar.url}}
              />
              <View className="ml-2">
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.05,
                  }}
                  className="text-black font-extrabold">
                  {(i.data as School).name}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: width * 0.037,
                  }}
                  className="text-black font-medium">
                  {(i.data as School).location}
                </Text>
              </View>
            </>
          )}
        </Pressable>
        {/* For User*/}
        {i.type === 'User' && (
          <View className="flex-row items-center gap-3 mt-2">
            <Pressable
              onPressIn={() => setEffectBlueButton(true)}
              onPressOut={() => setEffectBlueButton(false)}
              style={{
                backgroundColor: effectBlueButton ? '#1B4F8A' : '#2D64BC',
              }}
              className="items-center rounded-full py-1.5 flex-row justify-center flex-1">
              <ConnectIcon width={20} height={20} color="#fff" />
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-white font-bold ml-2">
                Connect
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('Profile', {idUser: (i.data as User)._id});
              }}
              onPressIn={() => setEffectTransparentButton(true)}
              onPressOut={() => setEffectTransparentButton(false)}
              style={{
                backgroundColor: effectTransparentButton
                  ? '#D8E8FB'
                  : 'transparent',
              }}
              className="items-center rounded-full py-1.5 flex-1 border">
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-[#666] font-bold ml-2">
                View full profile
              </Text>
            </Pressable>
          </View>
        )}
        {/* For Company and School*/}
        {i.type === 'Company' ||
          (i.type === 'University' && (
            <View className="flex-row items-center gap-3 mt-2">
              <Pressable
                onPressIn={() => setEffectBlueButton(true)}
                onPressOut={() => setEffectBlueButton(false)}
                style={{
                  backgroundColor: effectBlueButton ? '#1B4F8A' : '#2D64BC',
                }}
                className="items-center flex-1 flex-row rounded-full py-1.5 justify-center ">
                <PlusIcon width={20} height={20} color="#fff" />
                <Text
                  style={{
                    fontSize: width * 0.04,
                  }}
                  className="text-white font-bold ml-2">
                  Follow
                </Text>
              </Pressable>
              <Pressable
                onPressIn={() => setEffectTransparentButton(true)}
                onPressOut={() => setEffectTransparentButton(false)}
                style={{
                  backgroundColor: effectTransparentButton
                    ? '#D8E8FB'
                    : 'transparent',
                }}
                className="items-center justify-center flex-row flex-1 rounded-full py-1.5  border border-[#2D64BC] ">
                <SendIcon width={20} height={20} color="#2D64BC" />

                <Text
                  style={{
                    fontSize: width * 0.04,
                  }}
                  className="text-[#2D64BC] font-bold ml-2">
                  Message
                </Text>
              </Pressable>
            </View>
          ))}
      </View>
      {/* <Text
          style={{
            fontSize: width * 0.045,
          }}
          className="text-black font-bold">
          People
        </Text>
        <FlatList
          className="mt-4"
          data={results}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <Pressable onPress={() => {}} className="flex-row">
              {item.type === 'User' && (
                <>
                  <Image
                    className="w-12 h-12 rounded-full"
                    source={{uri: (item.data as User).avatar.url}}
                  />
                  <View className="ml-2">
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: width * 0.042,
                      }}
                      className="text-black font-extrabold">
                      {(item.data as User).fullName}
                    </Text>
                    {(item.data as User).experiences.length > 0 ? (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: width * 0.035,
                        }}
                        className="text-black font-medium">
                        {(item.data as User).experiences[0].jobTitle} at{' '}
                        {(item.data as User).experiences[0].company.name}
                      </Text>
                    ) : (
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontSize: width * 0.035,
                        }}
                        className="text-black font-medium">
                        Student at{' '}
                        {(item.data as User).educations[0].school.name}
                      </Text>
                    )}
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{
                        fontSize: width * 0.035,
                      }}
                      className="text-[#676767] font-medium">
                      {(item.data as User).location}
                    </Text>
                  </View>
                </>
              )}
            </Pressable>
          )}
        />
      */}
    </SafeAreaView>
  );
}
