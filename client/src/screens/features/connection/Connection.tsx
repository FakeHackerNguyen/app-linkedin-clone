import React, {useState} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import ThreeDots from '../../../components/icons/ThreeDots';

const {width} = Dimensions.get('screen');

export default function Connection(): React.JSX.Element {
  const [messagePressed, setMessagePressed] = useState(false);

  return (
    <Pressable className="bg-white flex-row justify-between border-b border-[#eaeaea] p-4">
      <Image
        className="rounded-full w-12 h-12"
        source={{
          uri: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png',
        }}
      />
      <View
        style={{
          width: width * 0.4,
        }}
        className="flex-col">
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-black font-extrabold"
          style={{
            fontSize: width * 0.04,
          }}>
          Nguyen Toanaaaaaaaaaaaaa
        </Text>
        <Text
          className="text-black font-medium"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            fontSize: width * 0.035,
          }}>
          Student at HCMC University of Techaaaaaaaaaaa
        </Text>
        <Text
          className="text-[#666] font-semibold mt-3"
          style={{
            fontSize: width * 0.032,
          }}>
          Connected 6 months ago
        </Text>
      </View>
      <View className="flex-row items-center">
        <ThreeDots width={20} height={5} />
        <Pressable
          style={{
            backgroundColor: messagePressed ? '#DAE7F8' : '#FFFFFF',
          }}
          onPressIn={() => setMessagePressed(true)}
          onPressOut={() => setMessagePressed(false)}
          className="ml-4 border border-[#2D64BC] rounded-full py-1 px-3">
          <Text
            className="text-[#2D64BC] font-bold"
            style={{
              fontSize: width * 0.04,
            }}>
            Message
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}
