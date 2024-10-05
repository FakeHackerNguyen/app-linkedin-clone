import React, {useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  Text,
} from 'react-native';
import Logo from '../../../components/Logo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../App';
import {ForgotPasswordStackParams} from '../../../navigation/ForgotPasswordNavigator';
import InputFloatingLabel from '../../../components/InputFloatingLabel';

const {width, height} = Dimensions.get('screen');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NavigationProp = NativeStackNavigationProp<
  RootStackParams & ForgotPasswordStackParams,
  'AddingEmail'
>;

type Error = {
  emailPhone: string;
};

export default function ForgotPasswordAddingEmail({
  navigation,
}: {
  navigation: NavigationProp;
}): React.JSX.Element {
  const [isDonePressed, setIsDonePressed] = useState(false);
  const [emailPhone, setEmailPhone] = useState('');
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    emailPhone: '',
  });

  const handleContinue = () => {
    let error: Error = {
      emailPhone: '',
    };

    if (!emailRegex.test(emailPhone)) {
      error.emailPhone = 'Please enter a valid email address';
    }

    if (
      Object.values(error).some((e: string) => {
        return e.trim() !== '';
      })
    ) {
      return setErrors(error);
    }

    navigation.replace('VerifyingEmail', {email: emailPhone});
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 0}
        className="flex-1">
        <View
          style={{
            marginTop: height * 0.03,
          }}
          className="flex-col mx-5">
          <Pressable
            onPress={() => navigation.goBack()}
            onPressIn={() => setIsDonePressed(true)}
            onPressOut={() => setIsDonePressed(false)}>
            <Text
              style={{
                fontSize: width * 0.045,
                color: isDonePressed ? '#eaeaea' : '#2d64bc',
              }}
              className="font-extrabold">
              Done
            </Text>
          </Pressable>
          <Logo />
        </View>
        <View className="mx-8 mt-10">
          <Text
            style={{
              fontSize: width * 0.08,
            }}
            className="font-extrabold text-black">
            Forgot Password
          </Text>
          <View className="mt-10">
            <InputFloatingLabel
              label="Email or Phone"
              data={emailPhone}
              onHandleChange={value => {
                setEmailPhone(value);
                if (value.trim()) {
                  setErrors({...errors, emailPhone: ''});
                }
              }}
            />
            {errors.emailPhone ? (
              <Text
                style={{
                  fontSize: width * 0.038,
                }}
                className="text-red-600 font-extrabold">
                {errors.emailPhone}
              </Text>
            ) : null}
          </View>
          <Text
            className="font-[#666] font-semibold mt-7"
            style={{
              fontSize: width * 0.038,
            }}>
            We'll send a verification code to this email or phone number if it
            matches an existing SocialJob account
          </Text>
        </View>
        <View className="flex items-center justify-center mt-5">
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
              Next
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
