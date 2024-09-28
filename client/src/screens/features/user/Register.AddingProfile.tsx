import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef, useState} from 'react';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator.tsx';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
  Text,
  Switch,
  TextInput,
  Animated,
  Pressable,
  Modal,
  FlatList,
} from 'react-native';
import Logo from '../../../components/Logo.tsx';
import {getLocations} from '../../../api/externalApi.ts';

const {width, height} = Dimensions.get('screen');

type Company = {
  name: string;
  typeOfBusiness: string;
};
type University = {
  name: string;
  region: string;
};
type Profile = {
  location: string;
  jobTitle?: string;
  company?: Company;
  university?: University;
  startYear?: string;
  endYear?: string;
};

const defaultProfile = {
  location: '',
  jobTitle: '',
  company: {
    name: '',
    typeOfBusiness: '',
  },
  employmentType: '',
  school: {
    name: '',
    region: '',
  },
  startYear: '',
  endYear: '',
};

type NavigationProp = NativeStackNavigationProp<
  RegisterStackParams,
  'AddingEmail'
>;

export default function RegisterAddingProfile({
  navigation,
}: {
  navigation: NavigationProp;
}): React.JSX.Element {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [query, setQuery] = useState('');
  const [suggestLocation, setSuggestLocation] = useState<string[]>([]);

  const [isEnabeldSwitch, setIsEnabledSwitch] = useState(false);
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const toggleSwitch = () => {
    setIsEnabledSwitch(previousState => !previousState);
  };

  const handleChangeQuery = async (value: string) => {
    setQuery(value);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        //   setSuggestions([]);
      }}>
      <View className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 0}
          className="flex-1">
          <View
            style={{
              marginTop: height * 0.05,
            }}>
            <Logo />
          </View>
          <View className="mx-8 mt-10">
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
              <Pressable onPress={openModal}>
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
                  // onChangeText={handleChange}
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>

        <Modal visible={isModalVisible} transparent={true} animationType="none">
          <Animated.View
            className="bg-white h-full w-full absolute"
            style={{
              transform: [{translateY: slideAnim}],
            }}>
            <View
              style={{
                marginTop: height * 0.04,
              }}
              className="relative flex-row items-center">
              <Pressable
                onPressIn={() => setIsClosePressed(true)}
                onPressOut={() => setIsClosePressed(false)}
                onPress={() => {
                  setQuery('');
                  setSuggestLocation([]);
                  closeModal();
                }}
                className="absolute pl-4">
                <Text
                  style={{
                    fontSize: width * 0.05,
                    color: isClosePressed ? 'gray' : '#666',
                  }}
                  className="font-bold">
                  ✕
                </Text>
              </Pressable>
              <View className="flex-1 items-center">
                <Text
                  style={{
                    fontSize: width * 0.05,
                  }}
                  className="text-black font-extrabold">
                  Location
                </Text>
              </View>
            </View>

            <TextInput
              placeholder="Location"
              placeholderTextColor="#676767"
              className="text-[#676767] border-t border-b border-[#eaeaea] font-medium mt-3 px-4"
              style={{
                fontSize: width * 0.035,
              }}
              value={query}
              onChangeText={value => handleChangeQuery(value)}
            />
            <FlatList
              data={suggestLocation}
              keyExtractor={item => item}
              renderItem={({item}) => (
                <Pressable
                  onPress={() => {
                    setProfile({...profile, location: item});
                    setQuery('');
                    setSuggestLocation([]);
                    closeModal();
                  }}>
                  <Text
                    className="text-black font-extrabold border-b border-[#eaeaea] p-3.5"
                    style={{
                      fontSize: width * 0.038,
                    }}>
                    {item}
                  </Text>
                </Pressable>
              )}
              className="bg-white w-full border-l border-b border-r border-gray-300 mt-1 z-50"
            />
          </Animated.View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}
