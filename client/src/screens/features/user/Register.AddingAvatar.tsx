import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Logo from '../../../components/Logo';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RegisterStackParams} from '../../../navigation/RegisterNavigator.tsx';
import {launchImageLibrary} from 'react-native-image-picker';

const {width, height} = Dimensions.get('screen');

type NavigationProp = NativeStackNavigationProp<
  RegisterStackParams,
  'AddingName'
>;

export default function RegisterAddingAvatar({
  navigation,
}: {
  navigation: NavigationProp;
}): React.JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isContinuePressed, setIsContinuePressed] = useState(false);
  const [isSkipPressed, setIsSkipPressed] = useState(false);

  console.log(selectedImage);

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setSelectedImage(asset.uri || null);
        } else {
          // Handle any other case here (for example, when the user has no access to photos)
        }
      },
    );
  };

  return (
    <View className="bg-white flex-1">
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
          Adding a photo helps people recognize you
        </Text>
        <TouchableWithoutFeedback onPress={handleImageSelect}>
          <View
            style={{
              height: height * 0.25,
            }}
            className="mt-6 w-full border border-[#e9e9e9] rounded-[10px] bg-white items-center">
            {selectedImage ? (
              <Image
                className="border border-[#e9e9e9] rounded-full justify-center items-center bg-[#f9fafb] mt-5"
                style={{
                  width: width * 0.22,
                  height: width * 0.22,
                }}
                source={{uri: selectedImage}}
              />
            ) : (
              <View
                style={{
                  width: width * 0.22,
                  height: width * 0.22,
                }}
                className="border border-[#e9e9e9] rounded-full justify-center items-center bg-[#f9fafb] mt-5">
                <Image
                  source={require('../../../assets/images/uploadAvatar.png')}
                />
              </View>
            )}

            <View className="flex-col items-center justify-center mt-3">
              <Text
                style={{
                  fontSize: width * 0.05,
                }}
                className="text-black font-extrabold">
                Nguyen Toan
              </Text>
              <Text
                style={{
                  fontSize: width * 0.04,
                }}
                className="text-black font-semibold">
                Assistant at Adobe
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View className="flex items-center justify-center mb-4">
        <Pressable
          style={{
            backgroundColor: isContinuePressed ? '#1B4F8A' : '#2D64BC',
            width: width * 0.85,
            height: height * 0.05,
            borderRadius: width * 0.05,
          }}
          className="items-center justify-center"
          onPress={handleImageSelect}
          onPressIn={() => setIsContinuePressed(true)}
          onPressOut={() => setIsContinuePressed(false)}>
          <Text
            style={{
              fontSize: width * 0.045,
            }}
            className="text-white font-bold">
            Add a photo
          </Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: isSkipPressed ? '#e0e0e0' : 'transparent',
            width: width * 0.85,
            height: height * 0.05,
            marginTop: height * 0.02,
          }}
          className="items-center justify-center"
          onPress={() => navigation.replace('AddingAvatar')}
          onPressIn={() => setIsSkipPressed(true)}
          onPressOut={() => setIsSkipPressed(false)}>
          <Text
            style={{
              fontSize: width * 0.045,
              color: isContinuePressed ? '#000' : '#666',
            }}
            className="text-white font-bold">
            Skip for now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
