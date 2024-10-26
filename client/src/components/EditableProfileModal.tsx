import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  TextInput,
  View,
  Text,
} from 'react-native';
import DropDownArrow from './icons/DropDownArrow';

const {height, width} = Dimensions.get('screen');

type SearchableModalProps = {
  slideAnim: Animated.Value;
  isModalVisible: boolean;
  //   modalType: string;
  //   query: string;
  onCloseModal: () => void;
  //   onHandleChangeQuery: (value: string) => void;
  //   data: (string | Company | School)[];
  //   onSelect: (item: string | Company | School) => void;
};

type Error = {
  firstName: string;
  lastName: string;
  headline: string;
};

export default function EditableProfileModal({
  slideAnim,
  isModalVisible,
  onCloseModal,
}: SearchableModalProps) {
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [errors, setErrors] = useState<Error>({
    firstName: '',
    lastName: '',
    headline: '',
  });

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="none">
      <Animated.View
        className="bg-white h-full w-full absolute"
        style={{
          transform: [{translateY: slideAnim}],
        }}>
        <View
          style={{
            marginTop: height * 0.02,
          }}
          className="relative flex-row items-center">
          <Pressable
            onPressIn={() => setIsClosePressed(true)}
            onPressOut={() => setIsClosePressed(false)}
            onPress={onCloseModal}
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
              Edit intro
            </Text>
          </View>
        </View>
        <View className="mx-4">
          <Text className="font-semibold mt-5">* Indicates required</Text>

          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              First name*
            </Text>
            <TextInput
              className="w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.035,
                fontSize: width * 0.04,
              }}
              autoCapitalize="none"
              autoCorrect={false}
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
              Last name*
            </Text>
            <TextInput
              className="w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.035,
                fontSize: width * 0.04,
              }}
              autoCapitalize="none"
              autoCorrect={false}
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
          <View className="mt-5">
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold">
              Headline*
            </Text>
            <TextInput
              className="w-max border rounded-[4px] font-medium py-0 px-2"
              style={{
                height: height * 0.035,
                fontSize: width * 0.04,
              }}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.headline ? (
              <Text
                style={{
                  fontSize: width * 0.038,
                }}
                className="text-red-600 font-extrabold">
                {errors.headline}
              </Text>
            ) : null}
          </View>
          <View className="mt-12">
            <Text
              style={{
                fontSize: width * 0.055,
              }}
              className="text-black font-extrabold">
              Current position
            </Text>
            <Text
              style={{
                fontSize: width * 0.04,
              }}
              className="text-[#676767] font-semibold mt-2">
              Position*
            </Text>
            <Pressable className="flex-row items-center border rounded-[4px]">
              <TextInput
                className="flex-1 text-black w-max font-medium py-0 px-2"
                style={{
                  height: height * 0.035,
                  fontSize: width * 0.04,
                }}
                autoCapitalize="none"
                autoCorrect={false}
                editable={false}
                pointerEvents="none"
                value=""
              />
              <DropDownArrow width={30} height={30} />
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
}
