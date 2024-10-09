import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {Store} from '../../../redux/store';
import {RouteProp} from '@react-navigation/native';
import {TabParamList} from '../../../navigation/BottomNavigation';
import CameraIcon from '../../../components/icons/CameraIcon';

const {width, height} = Dimensions.get('screen');

type ProfileProps = {
  route: RouteProp<TabParamList, 'Profile'>;
};

export default function Profile({route}: ProfileProps): React.JSX.Element {
  let {user} = useSelector((state: Store) => state.auth);
  const {idUser} = route.params;

  useEffect(() => {}, [idUser]);

  console.log(user);

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView>
        <Pressable>
          <Image
            style={{
              height: height * 0.1,
            }}
            className="w-full"
            source={{uri: user?.cover.url}}
          />
        </Pressable>
        <View
          style={{
            width: width * 0.08,
            height: width * 0.08,
          }}
          className="absolute right-2 top-2 bg-white rounded-full items-center justify-center">
          <CameraIcon />
        </View>
        <View
          style={{
            top: height * 0.05,
          }}
          className="absolute left-4 right-10">
          <Pressable>
            <Image
              style={{
                width: width * 0.3,
                height: width * 0.3,
                overflow: 'hidden',
              }}
              source={{uri: user?.avatar.url}}
              className="rounded-full"
            />
          </Pressable>

          <Text
            style={{
              fontSize: width * 0.06,
            }}
            className="text-black font-extrabold mt-3">
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="text-black font-semibold">
            {user?.headline}
          </Text>

          <View className="flex-row gap-2 mt-2">
            {user?.experiences[0]?.company && (
              <Text
                style={{
                  fontSize: width * 0.035,
                }}
                className="text-black font-medium">
                {user?.experiences[0].company.name}
              </Text>
            )}
            {user?.experiences[0]?.company && user?.educations[0]?.school && (
              <Text
                style={{
                  fontSize: width * 0.035,
                }}
                className="text-black font-medium">
                •
              </Text>
            )}
            {user?.educations[0]?.school && (
              <Text
                style={{
                  fontSize: width * 0.035,
                }}
                className="text-black font-medium">
                {user?.educations[0]?.school.name}
              </Text>
            )}
          </View>
          <Text
            style={{
              fontSize: width * 0.035,
            }}
            className="text-[#666] font-semibold">
            {user?.location}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
