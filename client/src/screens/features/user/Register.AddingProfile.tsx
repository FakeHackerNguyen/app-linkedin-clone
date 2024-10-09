import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator.tsx';
import {
  Dimensions,
  View,
  Text,
  Switch,
  TextInput,
  Animated,
  Pressable,
} from 'react-native';
import Logo from '../../../components/Logo.tsx';
import {getJobTitles, getLocations} from '../../../api/externalApi.ts';
import SearchableModal from '../../../components/SearchableModal.tsx';
import DropDownArrow from '../../../components/icons/DropDownArrow.tsx';
import {RouteProp} from '@react-navigation/native';
import {updateUser} from '../../../api/userApi.ts';
import {searchCompany, searchUniversity} from '../../../api/searchApi.ts';
import {Company, School} from '../../../types/index.ts';

const {width, height} = Dimensions.get('screen');

type Profile = {
  location: string;
  jobTitle?: string;
  company?: Company | null;
  school?: School | null;
  startStudy?: string;
  endStudy?: string;
};

const defaultProfile = {
  location: '',
  jobTitle: '',
  company: null,
  school: null,
  startYear: '',
  endYear: '',
};

type AddingProfileProps = {
  route: RouteProp<RegisterStackParams, 'AddingProfile'>;
  navigation: NativeStackNavigationProp<RegisterStackParams, 'AddingProfile'>;
};

type ModalSearchableType = 'Location' | 'Job Title' | 'Company' | 'School';

export default function RegisterAddingProfile({
  route,
  navigation,
}: AddingProfileProps): React.JSX.Element {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [query, setQuery] = useState('');
  const [suggestData, setSuggestData] = useState<(string | Company | School)[]>(
    [],
  );
  const [isEnabeldSwitch, setIsEnabledSwitch] = useState(false);
  const [modalSearchType, setModalSearchType] =
    useState<ModalSearchableType>('Location');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const {email} = route.params;

  const slideAnim = useRef(new Animated.Value(height)).current;

  const openModal = (type: ModalSearchableType) => {
    setIsModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0, // Moves the modal to the top (on-screen)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalSearchType(type);
    });
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height, // Moves the modal off-screen (bottom)
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
      setQuery('');
      setSuggestData([]);
    });
  };

  const toggleSwitch = () => {
    setIsEnabledSwitch(previousState => !previousState);
  };

  const handleQueryChange = async (value: string) => {
    setQuery(value);
    let res;
    if (modalSearchType === 'Location') {
      res = await getLocations(value);
    } else if (modalSearchType === 'Job Title') {
      res = await getJobTitles(value);
    } else if (modalSearchType === 'Company') {
      res = await searchCompany(value);
    } else if (modalSearchType === 'School') {
      res = await searchUniversity(value);
    }

    const data = res!.data;
    if (data) {
      return setSuggestData(data);
    }
  };

  const handleNext = async () => {
    if (isFormValid) {
      if (profile.company) {
        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('location', profile.location);

        if (profile.company) {
          formData.append(
            'headline',
            `${profile.jobTitle} at ${profile.company.name}`,
          );
          formData.append(
            'experiences',
            JSON.stringify([
              {
                company: profile.company,
                jobTitle: profile.jobTitle,
                location: profile.location,
              },
            ]),
          );
        }

        if (profile.school) {
          formData.append('headline', `Student at ${profile.school.name}`);
          formData.append(
            'educations',
            JSON.stringify([
              {
                school: profile.school,
                startStudy: profile.startStudy,
                endStudy: profile.endStudy,
              },
            ]),
          );
        }

        const {errorMessage} = await updateUser(formData);

        if (!errorMessage) {
          return navigation.replace('AddingAvatar', {email});
        }
      }
    }
  };

  useEffect(() => {
    if (
      !isEnabeldSwitch &&
      (!profile.location || !profile.jobTitle || !profile.company?.name)
    ) {
      return;
    }

    setIsFormValid(true);
  }, [isEnabeldSwitch, profile]);

  console.log(profile);

  return (
    <View className="flex-1 bg-white">
      <View
        style={{
          marginTop: height * 0.05,
        }}
        className="flex-row items-center">
        <Logo />
      </View>
      <View className="mx-8 mt-10 flex-1">
        <Text
          style={{
            fontSize: width * 0.07,
          }}
          className="font-extrabold text-black">
          Your profile helps you discover new people and opportunities
        </Text>
        <View className="mt-5 flex-row items-center justify-between">
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="text-black font-extrabold">
            I'm a student
          </Text>
          <View className="flex-row items-center gap-1">
            <Text
              style={{
                fontSize: width * 0.035,
              }}
              className="text-[#666] font-medium">
              {isEnabeldSwitch ? 'Yes' : 'No'}
            </Text>
            <Switch
              trackColor={{false: '#767577', true: 'green'}}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              value={isEnabeldSwitch}
              onValueChange={toggleSwitch}
            />
          </View>
        </View>

        <View className="mt-5">
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="text-[#676767] font-semibold">
            Location*
          </Text>
          <Pressable onPress={() => openModal('Location')}>
            <TextInput
              className="text-black w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.04,
                fontSize: width * 0.04,
              }}
              autoCapitalize="none"
              autoCorrect={false}
              editable={false}
              pointerEvents="none"
              value={profile.location}
            />
          </Pressable>
        </View>
        {!isEnabeldSwitch && (
          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              Most recent job title*
            </Text>
            <Pressable onPress={() => openModal('Job Title')}>
              <TextInput
                className="text-black w-max border rounded-[4px] font-medium py-0 px-2"
                style={{
                  height: height * 0.04,
                  fontSize: width * 0.04,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
                pointerEvents="none"
                value={profile.jobTitle}
              />
            </Pressable>
          </View>
        )}
        {!isEnabeldSwitch && (
          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              Most recent company*
            </Text>
            <Pressable onPress={() => openModal('Company')}>
              <TextInput
                className="text-black w-max border rounded-[4px] font-medium py-0 px-2"
                style={{
                  height: height * 0.04,
                  fontSize: width * 0.04,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
                pointerEvents="none"
                value={profile.company?.name || ''}
              />
            </Pressable>
          </View>
        )}
        {isEnabeldSwitch && (
          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              University/School*
            </Text>
            <Pressable onPress={() => openModal('School')}>
              <TextInput
                className="text-black w-max border rounded-[4px] font-medium py-0 px-2"
                style={{
                  height: height * 0.04,
                  fontSize: width * 0.04,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
                pointerEvents="none"
                value={profile.jobTitle}
              />
            </Pressable>
          </View>
        )}
        {isEnabeldSwitch && (
          <View className="flex-row gap-2 mt-5">
            <View className="flex-1">
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-[#676767] font-semibold">
                Start Year*
              </Text>
              <Pressable
                className="flex-row items-center border rounded-[4px]"
                onPress={() => openModal('School')}>
                <TextInput
                  className="flex-1 text-black w-max font-medium py-0 px-2"
                  style={{
                    height: height * 0.04,
                    fontSize: width * 0.04,
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                  pointerEvents="none"
                  value={profile.jobTitle}
                />
                <DropDownArrow width={40} height={40} />
              </Pressable>
            </View>
            <View className="flex-1">
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-[#676767] font-semibold">
                End Year*
              </Text>
              <Pressable className="flex-row items-center border rounded-[4px]">
                <TextInput
                  className="flex-1 text-black w-max font-medium py-0 px-2"
                  style={{
                    height: height * 0.04,
                    fontSize: width * 0.04,
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={false}
                  pointerEvents="none"
                  value={profile.jobTitle}
                />
                <DropDownArrow width={40} height={40} />
              </Pressable>
            </View>
          </View>
        )}
      </View>
      <View className="flex items-center justify-center mb-4">
        <Pressable
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid
              ? isContinuePressed
                ? '#1B4F8A'
                : '#2D64BC'
              : '#EAEAEA',
            width: width * 0.85,
            height: height * 0.05,
            borderRadius: width * 0.05,
          }}
          className="items-center justify-center"
          onPress={handleNext}
          onPressIn={() => setIsContinuePressed(true)}
          onPressOut={() => setIsContinuePressed(false)}>
          <Text
            style={{
              fontSize: width * 0.045,
              color: isFormValid ? '#fff' : '#A4A4A4',
            }}
            className="text-white font-bold">
            Next
          </Text>
        </Pressable>
      </View>

      <SearchableModal
        slideAnim={slideAnim}
        isModalVisible={isModalVisible}
        modalType={modalSearchType}
        query={query}
        onCloseModal={closeModal}
        onHandleChangeQuery={handleQueryChange}
        data={suggestData}
        onSelect={item => {
          if (modalSearchType === 'Location') {
            setProfile({...profile, location: item as string});
          } else if (modalSearchType === 'Job Title') {
            setProfile({...profile, jobTitle: item as string});
          } else if (modalSearchType === 'Company') {
            setProfile({...profile, company: item as Company});
          } else if (modalSearchType === 'School') {
            setProfile({...profile, school: item as School});
          }
          closeModal();
        }}
      />
    </View>
  );
}
