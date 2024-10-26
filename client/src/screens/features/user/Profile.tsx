import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  NativeSyntheticEvent,
  TextLayoutEventData,
  Animated,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, Store} from '../../../redux/store';
import {RouteProp} from '@react-navigation/native';
import {TabParamList} from '../../../navigation/BottomNavigation';
import CameraIcon from '../../../components/icons/CameraIcon';
import ConnectIcon from '../../../components/icons/ConnectIcon';
import EditIconV2 from '../../../components/icons/EditIconV2';
import {Education, Experience, User} from '../../../types';
import EditableProfileModal from '../../../components/EditableProfileModal';
import {getPublicUser} from '../../../api/userApi';
import CustomSearchHeaderDrawer from '../../../components/CustomSearchHeaderDrawer';
import ResultSearch from '../../../components/ResultSearch';

const {width, height} = Dimensions.get('screen');

type ProfileProps = {
  navigation: any;
  route: RouteProp<TabParamList, 'Profile'>;
};

function Experiences({
  experiences,
}: {
  experiences: Array<Experience>;
}): React.JSX.Element {
  return (
    <View className="w-full bg-white px-4 py-4 mt-2">
      <Text
        style={{
          fontSize: width * 0.05,
        }}
        className="text-black font-extrabold">
        Experiences
      </Text>
      <FlatList
        scrollEnabled={false}
        className="mt-2"
        data={experiences}
        renderItem={({item}) => (
          <View className="flex-row items-center gap-2 mt-2">
            <Image
              className="w-12 h-12"
              source={{uri: item.company.avatar.url}}
            />
            <View>
              <Text
                className="text-black font-extrabold"
                style={{
                  fontSize: width * 0.04,
                }}>
                {item.jobTitle}
              </Text>
              <Text
                className="text-black font-medium"
                style={{
                  fontSize: width * 0.035,
                }}>
                {item.company.name}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

function Educations({
  educations,
}: {
  educations: Array<Education>;
}): React.JSX.Element {
  return (
    <View className="w-full bg-white px-4 py-4 mt-2">
      <Text
        style={{
          fontSize: width * 0.05,
        }}
        className="text-black font-extrabold">
        Educations
      </Text>
      <FlatList
        scrollEnabled={false}
        className="mt-2"
        data={educations}
        renderItem={({item}) => (
          <View className="flex-row items-center gap-2 mt-2">
            <Image
              className="w-12 h-12"
              source={{uri: item.school.avatar.url}}
            />
            <View>
              <Text
                className="text-black font-extrabold"
                style={{
                  fontSize: width * 0.04,
                }}>
                {item.school.name}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}

export default function Profile({
  navigation,
  route,
}: ProfileProps): React.JSX.Element {
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [editPressed, setEditPressed] = useState(false);
  const [connectOrMessagePressed, setConnectOrMessagePressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Moves the modal to the top (on-screen)
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Moves the modal off-screen (bottom)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  const onTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      setLengthMore(e.nativeEvent.lines.length >= 4);
    },
    [],
  );

  let {user} = useSelector((state: Store) => state.auth);
  const {isSearchFocus} = useSelector((state: Store) => state.search);
  const [profileUser, setProfileUser] = useState<User | null>(user);
  const {idUser} = route.params;
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    async function getInforPublicUser() {
      const {data, message} = await getPublicUser(idUser);

      if (message) {
        return;
      }

      setProfileUser(data.user);
    }

    if (user?._id !== idUser) {
      getInforPublicUser();
    }
    if (user?._id === idUser) {
      setProfileUser(user);
    }
  }, [user, idUser, dispatch]);

  return (
    <SafeAreaView className="bg-[#eaeaea] flex-1">
      <CustomSearchHeaderDrawer navigation={navigation} />
      {isSearchFocus ? (
        <ResultSearch />
      ) : (
        <ScrollView>
          <Pressable>
            <Image
              style={{
                height: height * 0.1,
              }}
              className="w-full"
              source={{uri: profileUser?.cover.url}}
            />
          </Pressable>

          {profileUser?._id === user?._id ? (
            <View
              style={{
                width: width * 0.08,
                height: width * 0.08,
              }}
              className="absolute right-2 top-2 bg-white rounded-full items-center justify-center">
              <CameraIcon />
            </View>
          ) : null}

          <View className="w-full bg-white px-4 py-4">
            <View className="flex-row justify-between">
              <Pressable className="mt-[-80px]">
                <Image
                  style={{
                    width: width * 0.3,
                    height: width * 0.3,
                    overflow: 'hidden',
                  }}
                  source={{uri: profileUser?.avatar.url}}
                  className="rounded-full"
                />
              </Pressable>
              {profileUser?._id === user?._id ? (
                <Pressable
                  onPress={openModal}
                  onPressIn={() => setEditPressed(true)}
                  onPressOut={() => setEditPressed(false)}
                  style={{
                    width: width * 0.12,
                    height: width * 0.12,
                    backgroundColor: editPressed ? '#eaeaea' : 'transparent',
                  }}
                  className="rounded-full items-center justify-center">
                  <EditIconV2 width={30} height={30} />
                </Pressable>
              ) : null}
            </View>

            <Text
              style={{
                fontSize: width * 0.06,
              }}
              className="text-black font-extrabold mt-3 bg-white">
              {profileUser?.fullName}
            </Text>
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-black font-semibold">
              {profileUser?.headline}
            </Text>

            <View className="flex-row gap-2 mt-2">
              {profileUser?.experiences[0]?.company && (
                <Text
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="text-black font-medium">
                  {profileUser?.experiences[0].company.name}
                </Text>
              )}
              {profileUser?.experiences[0]?.company &&
                profileUser?.educations[0]?.school && (
                  <Text
                    style={{
                      fontSize: width * 0.035,
                    }}
                    className="text-black font-medium">
                    •
                  </Text>
                )}
              {profileUser?.educations[0]?.school && (
                <Text
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="text-black font-medium">
                  {profileUser?.educations[0]?.school.name}
                </Text>
              )}
            </View>
            <Text
              style={{
                fontSize: width * 0.035,
              }}
              className="text-[#666] font-semibold">
              {profileUser?.location}
            </Text>
            {profileUser?.connections ? (
              <Text
                style={{
                  fontSize: width * 0.035,
                }}
                className="text-[#2D64BC] font-extrabold mt-2">
                {profileUser?.connections.length} connections
              </Text>
            ) : null}
            {profileUser?._id !== user?._id ? (
              <Pressable
                onPressIn={() => setConnectOrMessagePressed(true)}
                onPressOut={() => setConnectOrMessagePressed(false)}
                style={{
                  backgroundColor: connectOrMessagePressed
                    ? '#1B4F8A'
                    : '#2D64BC',
                }}
                className="items-center rounded-full py-2 mt-2 flex-row justify-center">
                <ConnectIcon width={25} height={25} color="#fff" />
                <Text
                  style={{
                    fontSize: width * 0.04,
                  }}
                  className="text-white font-bold ml-2">
                  Connect
                </Text>
              </Pressable>
            ) : null}
          </View>
          {profileUser?.about && profileUser?.about.length > 0 ? (
            <View className="w-full bg-white px-4 py-4 mt-2">
              <Text
                style={{
                  fontSize: width * 0.05,
                }}
                className="text-black font-extrabold">
                About
              </Text>
              <Text
                onTextLayout={onTextLayout}
                numberOfLines={isTextExpanded ? 0 : 4}
                ellipsizeMode="clip"
                style={{
                  fontSize: width * 0.035,
                }}
                className="text-black font-medium">
                {profileUser?.about}
              </Text>
              {lengthMore && !isTextExpanded ? (
                <Text
                  onPress={() => setIsTextExpanded(true)}
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="text-[#666] font-semibold">
                  ...See more
                </Text>
              ) : null}
            </View>
          ) : null}
          {profileUser?.experiences && profileUser.experiences.length > 0 ? (
            <Experiences experiences={profileUser.experiences} />
          ) : null}
          {profileUser?.educations && profileUser.educations.length > 0 ? (
            <Educations educations={profileUser.educations} />
          ) : null}
        </ScrollView>
      )}
      <EditableProfileModal
        slideAnim={slideAnim}
        isModalVisible={isModalVisible}
        onCloseModal={closeModal}
      />
    </SafeAreaView>
  );
}
