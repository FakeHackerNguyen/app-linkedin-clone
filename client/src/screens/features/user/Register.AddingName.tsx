import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Logo from '../../../components/Logo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator.tsx';
import {RootStackParams} from '../../../../App';

const {width, height} = Dimensions.get('screen');

type Error = {
  firstName: string;
  lastName: string;
};

type NavigationProp = NativeStackNavigationProp<
  RegisterStackParams & RootStackParams,
  'AddingName'
>;

export default function RegisterAddingName({
  navigation,
}: {
  navigation: NavigationProp;
}): React.JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    firstName: '',
    lastName: '',
  });

  const handleContinue = () => {
    let error: Error = {
      firstName: '',
      lastName: '',
    };

    if (!firstName.trim()) {
      error.firstName = 'Please enter your first name';
    }
    if (!lastName.trim()) {
      error.lastName = 'Please enter your last name';
    }

    if (
      Object.values(error).some((e: string) => {
        return e.trim() !== '';
      })
    ) {
      return setErrors(error);
    }

    navigation.navigate('AddingEmail', {firstName, lastName});
  };

  return (
    <KeyboardAvoidingView className="bg-white flex-1">
      <View
        style={{
          marginTop: height * 0.05,
        }}
        className="flex-row items-center justify-between mr-6">
        <Logo />
        <Pressable
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{name: 'Intro'}],
            })
          }
          onPressIn={() => setIsClosePressed(true)}
          onPressOut={() => setIsClosePressed(false)}
          className="p-2 rounded"
          style={{
            backgroundColor: isClosePressed ? '#e0e0e0' : 'transparent',
          }}>
          <Text
            style={{
              fontSize: width * 0.05,
              color: isClosePressed ? '#000' : '#666',
            }}
            className="font-bold">
            ✕
          </Text>
        </Pressable>
      </View>
      <View className="mx-8 mt-10">
        <Text
          style={{
            fontSize: width * 0.08,
          }}
          className="font-extrabold text-black">
          Add your name
        </Text>
        <View className="mt-5">
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="text-[#676767] font-semibold">
            First Name
          </Text>
          <TextInput
            className="w-max border rounded-[4px] font-medium py-0 px-2"
            style={{
              height: height * 0.04,
              fontSize: width * 0.04,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={firstName}
            onChangeText={value => {
              setFirstName(value);
              if (value.trim()) {
                setErrors({...errors, firstName: ''});
              }
            }}
          />
          {errors.firstName ? (
            <Text
              style={{
                fontSize: width * 0.038,
              }}
              className="text-red-600 font-extrabold">
              {errors.firstName}
            </Text>
          ) : null}
        </View>
        <View className="mt-5">
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="text-[#676767] font-semibold">
            Last Name
          </Text>
          <TextInput
            className="w-max border rounded-[4px] font-medium py-0 px-2"
            style={{
              height: height * 0.04,
              fontSize: width * 0.04,
            }}
            autoCapitalize="none"
            autoCorrect={false}
            value={lastName}
            onChangeText={value => {
              setLastName(value);
              if (value.trim()) {
                setErrors({...errors, lastName: ''});
              }
            }}
          />
          {errors.lastName ? (
            <Text
              style={{
                fontSize: width * 0.038,
              }}
              className="text-red-600 font-extrabold">
              {errors.lastName}
            </Text>
          ) : null}
        </View>
      </View>
      <View className="mt-6 flex items-center justify-center">
        <Pressable
          style={{
            backgroundColor: isContinuePressed ? '#1B4F8A' : '#2D64BC',
            width: width * 0.85,
            height: height * 0.05,
            borderRadius: width * 0.05,
            marginTop: height * 0.02,
          }}
          className="items-center justify-center"
          onPress={handleContinue}
          onPressIn={() => setIsContinuePressed(true)}
          onPressOut={() => setIsContinuePressed(false)}>
          <Text
            style={{
              fontSize: width * 0.045,
            }}
            className="text-white font-bold">
            Continue
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
