import React, {useEffect, useState} from 'react';
import Logo from '../../../components/Logo';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native';
import InputFloatingLabel from '../../../components/InputFloatingLabel';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../../../App';

const {width, height} = Dimensions.get('screen');

type NavigationProp = NativeStackNavigationProp<RootStackParams, 'Signin'>;

export default function Login({
  navigation,
}: {
  navigation: NavigationProp;
}): React.JSX.Element {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isForgotPasswordPressed, setIsForgotPasswordPressed] = useState(false);
  const [isSigninPressed, setIsSignInPressed] = useState(false);
  const [isClosePressed, setIsClosePressed] = useState(false);

  useEffect(() => {
    if (password === '') {
      setIsPasswordVisible(false);
    }
  }, [password]);

  console.log(
    `Signin Screen: { emailPhone: ${emailPhone}, password: ${password}} `,
  );

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 0}
        className="flex-1">
        <View
          style={{
            marginTop: height * 0.05,
          }}
          className="flex-row items-center justify-between mr-6">
          <Logo />
          <Pressable
            onPress={() => navigation.goBack()}
            onPressIn={() => setIsClosePressed(true)}
            onPressOut={() => setIsClosePressed(false)}
            className="p-2 rounded"
            style={{
              backgroundColor: isClosePressed ? '#e0e0e0' : 'transparent',
            }}>
            <Text
              style={{
                color: isClosePressed ? '#000' : '#666',
              }}
              className="font-bold text-[20px]">
              ✕
            </Text>
          </Pressable>
        </View>
        <View className="mx-8 mt-10">
          <Text
            style={{
              fontSize: width * 0.1,
            }}
            className="font-extrabold text-black">
            Sign in
          </Text>
          <Text
            style={{
              fontSize: width * 0.04,
            }}
            className="font-bold text-[#676767] mt-2">
            or
            <Text
              className="text-[#2D64BC]"
              onPress={() => navigation.navigate('Signup')}>
              {' '}
              Join SocialJob
            </Text>
          </Text>

          <View className="mt-5">
            <InputFloatingLabel
              label="Email or Phone"
              data={emailPhone}
              onHandleChange={(value: string) => setEmailPhone(value)}
            />
          </View>

          <View className="mt-5 relative">
            <InputFloatingLabel
              label="Password"
              visible={!isPasswordVisible}
              data={password}
              onHandleChange={(value: string) => setPassword(value)}
            />
            {password ? (
              <Pressable
                style={{
                  top: height * 0.02,
                  right: width * 0.035,
                }}
                className="absolute"
                onPress={() =>
                  setIsPasswordVisible(prevShowPassword => !prevShowPassword)
                }>
                <Text
                  style={{
                    fontSize: width * 0.035,
                  }}
                  className="text-[#2D64BC] font-bold">
                  {isPasswordVisible ? 'Hide' : 'Show'}
                </Text>
              </Pressable>
            ) : null}
          </View>

          <Pressable
            className="mt-5"
            onPress={() => navigation.navigate('ForgotPassword')}
            onPressIn={() => setIsForgotPasswordPressed(true)}
            onPressOut={() => setIsForgotPasswordPressed(false)}>
            <Text
              style={{
                fontSize: width * 0.04,
                backgroundColor: isForgotPasswordPressed
                  ? '#D8E8FB'
                  : 'transparent',
              }}
              className="text-[#2D64BC] rounded font-bold px-2 self-start">
              Forgot password?
            </Text>
          </Pressable>
        </View>

        <View className="flex items-center justify-center">
          <Pressable
            style={{
              backgroundColor: isSigninPressed ? '#1B4F8A' : '#2D64BC',
              width: width * 0.85,
              height: height * 0.05,
              borderRadius: width * 0.05,
              marginTop: height * 0.02,
            }}
            className="items-center justify-center"
            onPressIn={() => setIsSignInPressed(true)}
            onPressOut={() => setIsSignInPressed(false)}>
            <Text
              style={{
                fontSize: width * 0.045,
              }}
              className="text-white font-bold">
              Sign in
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
