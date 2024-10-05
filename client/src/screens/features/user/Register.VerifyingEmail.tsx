import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import Logo from '../../../components/Logo';
import {RootStackParams} from '../../../../App';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import {sendOtp, verifyOtp} from '../../../api/userApi';

const {width, height} = Dimensions.get('screen');

type Error = {
  code: string;
};

type VerifyingEmailProps = {
  route: RouteProp<RegisterStackParams, 'VerifyingEmail'>;
  navigation: NativeStackNavigationProp<
    RegisterStackParams & RootStackParams,
    'VerifyingEmail'
  >;
};

export default function RegisterVerifyingEmail({
  route,
  navigation,
}: VerifyingEmailProps): React.JSX.Element {
  const [code, setCode] = useState('');
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isResendPressed, setIsResendPressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    code: '',
  });

  const {email} = route.params;

  const handleSendOtp = async () => {
    let error: Error = {
      code: '',
    };

    if (!code) {
      error.code = "That's not the right code";
    }

    if (
      Object.values(error).some((e: string) => {
        return e.trim() !== '';
      })
    ) {
      return setErrors(error);
    }

    const {errorMessage} = await sendOtp(email, 'Sign Up');

    if (!errorMessage) {
      return;
    }
  };

  const handleNext = async () => {
    const {data} = await verifyOtp(email, code, 'Sign Up');

    if (data.isValid) {
      return navigation.replace('Signin');
    }
  };

  useEffect(() => {
    handleSendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
        <View className="mx-8 mt-10 flex-1">
          <Text
            style={{
              fontSize: width * 0.07,
            }}
            className="font-extrabold text-black">
            Enter the verification code
          </Text>
          <Text
            className="text-[#666] font-semibold"
            style={{
              fontSize: width * 0.04,
            }}>
            {`We sent the verification code to ${'hotdogtest1@hotmail.com'}. `}
            <Text className="font-extrabold">Edit email</Text>
          </Text>

          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              6 digit code*
            </Text>
            <TextInput
              className="w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.04,
                fontSize: width * 0.04,
              }}
              keyboardType="number-pad"
              maxLength={6}
              autoCapitalize="none"
              autoCorrect={false}
              value={code}
              onChangeText={(value: string) => setCode(value)}
            />
            {errors.code ? (
              <Text
                style={{
                  fontSize: width * 0.038,
                }}
                className="text-red-600 font-extrabold">
                {errors.code}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="flex items-center justify-center mb-4">
          <Pressable
            style={{
              backgroundColor: isResendPressed ? '#e0e0e0' : 'transparent',
              width: width * 0.85,
              height: height * 0.05,
            }}
            className="items-center justify-center"
            onPressIn={() => setIsResendPressed(true)}
            onPressOut={() => setIsResendPressed(false)}>
            <Text
              style={{
                fontSize: width * 0.045,
                color: isContinuePressed ? '#000' : '#666',
              }}
              className="text-white font-bold">
              Resend code
            </Text>
          </Pressable>
          <Pressable
            style={{
              backgroundColor: isContinuePressed ? '#1B4F8A' : '#2D64BC',
              width: width * 0.85,
              height: height * 0.05,
              borderRadius: width * 0.05,
              marginTop: height * 0.02,
            }}
            className="items-center justify-center"
            onPress={handleNext}
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
