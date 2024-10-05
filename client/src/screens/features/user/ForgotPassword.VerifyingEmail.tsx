import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  Text,
  TextInput,
} from 'react-native';
import Logo from '../../../components/Logo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../App';
import {ForgotPasswordStackParams} from '../../../navigation/ForgotPasswordNavigator';
import {sendOtp, verifyOtp} from '../../../api/userApi';
import {RouteProp} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

type ForgotPasswordVerifyingEmailProps = {
  route: RouteProp<ForgotPasswordStackParams, 'VerifyingEmail'>;
  navigation: NativeStackNavigationProp<
    RootStackParams & ForgotPasswordStackParams,
    'VerifyingEmail'
  >;
};

type Error = {
  code: string;
};

export default function ForgotPasswordVerifyingEmail({
  route,
  navigation,
}: ForgotPasswordVerifyingEmailProps): React.JSX.Element {
  const [isDonePressed, setIsDonePressed] = useState(false);
  const [code, setCode] = useState('');
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    code: '',
  });

  const {email} = route.params;

  console.log(errors);

  const handleContinue = async () => {
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

    const {data} = await verifyOtp(email, code, 'Forgot Password');

    if (data.isValid) {
      return navigation.replace('ConfirmPassword', {code, email});
    }
  };

  const handleSendOtp = async () => {
    const {errorMessage} = await sendOtp(email, 'Forgot Password');

    if (!errorMessage) {
      return;
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
            Enter the 6-digit code
          </Text>
          <Text
            className="font-[#666] font-semibold mt-7"
            style={{
              fontSize: width * 0.038,
            }}>
            {`Check ${email} for a verification code.`}{' '}
            <Text className="text-[#2D64BC] font-extrabold">Change</Text>
          </Text>
          <View className="mt-10">
            {!code && (
              <Text
                className="text-[#666] absolute py-0 px-2 font-semibold"
                style={{
                  fontSize: width * 0.04,
                  bottom: height * 0.04 - 4,
                }}>
                6-digit code
              </Text>
            )}
            <TextInput
              className="w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.04,
                fontSize: width * 0.04,
                letterSpacing: 5,
              }}
              keyboardType="number-pad"
              maxLength={6}
              autoCapitalize="none"
              autoCorrect={false}
              value={code}
              onChangeText={(value: string) => setCode(value)}
            />

            <Text
              style={{
                fontSize: width * 0.038,
              }}
              className="text-[#2D64BC] font-extrabold mt-1">
              Resend code
            </Text>
          </View>
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
              Submit
            </Text>
          </Pressable>
        </View>
        <View className="mx-8 mt-5">
          <Text
            style={{
              fontSize: width * 0.038,
            }}
            className="font-medium text-[#666]">
            If you don't see the email in your inbox, check your spam folder. If
            it's not there, the email address may not be confirmed, or it may
            not match an existing SocialJob account
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
