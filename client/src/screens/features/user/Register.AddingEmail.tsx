import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator.tsx';
import {RootStackParams} from '../../../../App';
import BackIcon from '../../../components/icons/BackIcon.tsx';
import {RouteProp} from '@react-navigation/native';
import {register} from '../../../api/userApi.ts';

const {width, height} = Dimensions.get('screen');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailDomains = [
  '@gmail.com',
  '@yahoo.com',
  '@outlook.com',
  '@icloud.com',
  '@hotmail.com',
];

type AddingEmailProps = {
  route: RouteProp<RegisterStackParams, 'AddingEmail'>;
  navigation: NativeStackNavigationProp<
    RegisterStackParams & RootStackParams,
    'AddingEmail'
  >;
};
type Error = {
  email: string;
  password: string;
};

export default function RegisterAddingEmail({
  route,
  navigation,
}: AddingEmailProps): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [fieldPasswordVisible, setfieldPasswordVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [isBackPressed, setIsBackPressed] = useState(false);
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [pressedSuggestion, setPressedSuggestion] = useState<string | null>(
    null,
  );
  const [errors, setErrors] = useState<Error>({
    email: '',
    password: '',
  });
  const {firstName, lastName} = route.params;

  console.log(
    `Register Adding Email: { email: ${email}, error: {email: ${errors.email}, password: ${errors.password}}}`,
  );

  const handleChange = (value: string) => {
    setEmail(value);

    if (value.trim()) {
      setErrors({...errors, email: ''});
    }

    const splitedEmail = value.split('@');
    if (splitedEmail.length === 2 && splitedEmail[1] === '') {
      const newSuggestions = emailDomains.map(
        domain => splitedEmail[0] + domain,
      );

      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionPress = (suggestedEmail: string) => {
    setEmail(suggestedEmail);
    setPressedSuggestion(null);
    setSuggestions([]);
  };

  const handleContinue = async () => {
    let error: Error = {
      email: '',
      password: '',
    };

    if (!emailRegex.test(email)) {
      error.email = 'Please enter a valid email address';
    }
    if ((password === '' || password.length < 6) && fieldPasswordVisible) {
      error.password = 'Please enter a valid password';
    }

    if (
      Object.values(error).some((e: string) => {
        return e.trim() !== '';
      })
    ) {
      return setErrors(error);
    }

    if (!fieldPasswordVisible && error.email === '') {
      return setfieldPasswordVisible(true);
    }

    if (fieldPasswordVisible && error.password === '') {
      const {errorMessage} = await register({
        firstName,
        lastName,
        email,
        password,
      });

      if (!errorMessage) {
        return navigation.replace('AddingProfile', {email});
      }
    }
  };

  useEffect(() => {
    if (password === '') {
      setIsPasswordVisible(false);
    }
  }, [password]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setSuggestions([]);
      }}>
      <View className="flex-1 bg-white">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? height * 0.1 : 0}
          className="flex-1">
          <View
            style={{
              marginTop: height * 0.05,
            }}
            className="flex-row items-center justify-between mx-6">
            <Pressable
              onPress={() => navigation.navigate('AddingName')}
              onPressIn={() => setIsBackPressed(true)}
              onPressOut={() => setIsBackPressed(false)}
              className="rounded"
              style={{
                backgroundColor: isBackPressed ? '#e0e0e0' : 'transparent',
              }}>
              <BackIcon />
            </Pressable>
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
              {fieldPasswordVisible ? 'Set your password' : 'Add your email'}
            </Text>
            <View className="mt-5">
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-[#676767] font-semibold">
                Email
              </Text>
              <TextInput
                className="w-max border rounded-[4px] font-medium py-0 px-2"
                style={{
                  height: height * 0.04,
                  fontSize: width * 0.04,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={handleChange}
              />
              {suggestions.length > 0 && (
                <FlatList
                  data={suggestions}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <Pressable
                      className="px-4 py-2"
                      onPress={() => handleSuggestionPress(item)}
                      onPressIn={() => setPressedSuggestion(item)}
                      onPressOut={() => setPressedSuggestion(null)}
                      style={{
                        backgroundColor:
                          item === pressedSuggestion
                            ? '#d1d1d6'
                            : 'transparent', // Change background when selected
                      }}>
                      <Text
                        className="text-black font-semibold"
                        style={{
                          fontSize: width * 0.038,
                        }}>
                        {item}
                      </Text>
                    </Pressable>
                  )}
                  className="bg-white w-full border-l border-b border-r border-gray-300 mt-1 z-50 absolute"
                  style={{
                    maxHeight: height * 0.25,
                    top: height * 0.04 + 25,
                    elevation: 8,
                  }}
                />
              )}
              {errors.email ? (
                <Text
                  style={{
                    fontSize: width * 0.038,
                  }}
                  className="text-red-600 font-extrabold">
                  {errors.email}
                </Text>
              ) : null}
            </View>

            {fieldPasswordVisible ? (
              <View className="mt-5 relative">
                <Text
                  style={{
                    fontSize: width * 0.04,
                  }}
                  className="text-[#676767] font-semibold">
                  Password
                </Text>
                <TextInput
                  className="w-max border rounded-[4px] font-medium py-0 pl-2"
                  style={{
                    height: height * 0.04,
                    fontSize: width * 0.04,
                    paddingRight: width * 0.15,
                  }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                  onChangeText={value => {
                    setPassword(value);
                    if (value.trim()) {
                      setErrors({...errors, password: ''});
                    }
                  }}
                />
                {password && (
                  <Pressable
                    style={{
                      top: height * 0.032,
                      right: width * 0.035,
                    }}
                    className="absolute"
                    onPress={() =>
                      setIsPasswordVisible(
                        prevShowPassword => !prevShowPassword,
                      )
                    }>
                    <Text
                      style={{
                        fontSize: width * 0.035,
                      }}
                      className="text-[#2D64BC] font-bold">
                      {isPasswordVisible ? 'Hide' : 'Show'}
                    </Text>
                  </Pressable>
                )}
                {errors.password ? (
                  <Text
                    style={{
                      fontSize: width * 0.038,
                    }}
                    className="text-red-600 font-extrabold">
                    {errors.password}
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontSize: width * 0.038,
                    }}
                    className="text-[#666] font-semibold">
                    6 or more characters
                  </Text>
                )}
              </View>
            ) : null}
          </View>

          <View className="mt-2 flex items-center justify-center">
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
      </View>
    </TouchableWithoutFeedback>
  );
}
