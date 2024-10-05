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
import {resetPassword} from '../../../api/userApi';
import {RouteProp} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

type ForgotPasswordcConfirmPasswordProps = {
  route: RouteProp<ForgotPasswordStackParams, 'ConfirmPassword'>;
  navigation: NativeStackNavigationProp<
    RootStackParams & ForgotPasswordStackParams,
    'ConfirmPassword'
  >;
};

type Error = {
  newPassword: string;
  confirmNewPassword: string;
};

export default function ForgotPasswordConfirmPassword({
  route,
  navigation,
}: ForgotPasswordcConfirmPasswordProps): React.JSX.Element {
  const [isDonePressed, setIsDonePressed] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    newPassword: '',
    confirmNewPassword: '',
  });

  const {code, email} = route.params;

  const handleContinue = async () => {
    let error: Error = {
      newPassword: '',
      confirmNewPassword: '',
    };

    if (!newPassword) {
      error.newPassword = 'Please choose strong password';
    }
    if (newPassword.length < 6) {
      error.newPassword = 'Too short';
    }
    if (newPassword !== confirmNewPassword) {
      error.confirmNewPassword = 'Not match';
    }

    if (
      Object.values(error).some((e: string) => {
        return e.trim() !== '';
      })
    ) {
      return setErrors(error);
    }

    const {errorMessage} = await resetPassword(
      email,
      code,
      'Forgot Password',
      newPassword,
    );

    if (!errorMessage) {
      return navigation.replace('Signin');
    }

    console.log(errorMessage);
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
              fontSize: width * 0.07,
            }}
            className="font-extrabold text-black">
            Choose a new password
          </Text>
          <Text
            className="font-[#666] font-bold mt-2"
            style={{
              fontSize: width * 0.038,
            }}>
            To secure your account, choose a strong password you haven't used
            before and is at least 8 characters long
          </Text>
          <View className="mt-5 relative">
            <InputFloatingLabel
              label="Password"
              visible={!isPasswordVisible}
              data={newPassword}
              onHandleChange={(value: string) => setNewPassword(value)}
            />
            {errors.newPassword ? (
              <Text
                style={{
                  fontSize: width * 0.038,
                }}
                className="text-red-600 font-extrabold">
                {errors.newPassword}
              </Text>
            ) : null}
            {newPassword ? (
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
          <View className="mt-5">
            <InputFloatingLabel
              label="Retype new password"
              data={confirmNewPassword}
              onHandleChange={value => {
                setConfirmNewPassword(value);
                if (value.trim()) {
                  setErrors({...errors, confirmNewPassword: ''});
                }
              }}
            />
            {errors.confirmNewPassword ? (
              <Text
                style={{
                  fontSize: width * 0.038,
                }}
                className="text-red-600 font-extrabold">
                {errors.confirmNewPassword}
              </Text>
            ) : null}
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
      </KeyboardAvoidingView>
    </View>
  );
}
