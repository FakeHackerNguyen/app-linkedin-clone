import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Store} from '../redux/store';
import DropDownArrow from './icons/DropDownArrow';
import ImageIcon from './icons/ImageIcon';

const {height, width} = Dimensions.get('screen');

type CreatingPostModalProps = {
  slideAnim: Animated.Value;
  isModalVisible: boolean;
  onCloseModal: () => void;
};

export default function CreatingPostModal({
  slideAnim,
  isModalVisible,
  onCloseModal,
}: CreatingPostModalProps): React.JSX.Element {
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [isControlPostPressed, setIsControllPostPressed] = useState(false);
  const [isPostPressed, setIsPostPressed] = useState(false);

  const {user} = useSelector((state: Store) => state.auth);
  return (
    <Modal visible={isModalVisible} transparent={true} animationType="none">
      <Animated.View
        className="bg-white h-full w-full absolute"
        style={{
          transform: [{translateY: slideAnim}],
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View
            className="mx-5 flex-col flex-1"
            style={{
              marginTop: height * 0.02,
            }}>
            <View className="flex-row items-center">
              <View className="flex-row items-center flex-1">
                <Pressable
                  onPressIn={() => setIsClosePressed(true)}
                  onPressOut={() => setIsClosePressed(false)}
                  onPress={onCloseModal}>
                  <Text
                    style={{
                      fontSize: width * 0.05,
                      color: isClosePressed ? 'gray' : '#666',
                    }}
                    className="font-bold">
                    ✕
                  </Text>
                </Pressable>
                <Image
                  className="w-8 h-8 rounded-full ml-4 mr-3"
                  source={{
                    uri: user?.avatar.url,
                  }}
                />
                <Pressable
                  onPressIn={() => setIsControllPostPressed(true)}
                  onPressOut={() => setIsControllPostPressed(false)}
                  style={{
                    backgroundColor: isControlPostPressed
                      ? '#eaeaea'
                      : 'transparent',
                  }}
                  className="flex-row items-center px-2 py-1 rounded-[4px]">
                  <Text
                    className="text-[#666] font-bold"
                    style={{
                      fontSize: width * 0.04,
                    }}>
                    Anyone
                  </Text>
                  <DropDownArrow width={22} height={22} />
                </Pressable>
              </View>
              <Pressable
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: '#eaeaea',
                }}>
                <Text
                  className="font-bold"
                  style={{
                    fontSize: width * 0.04,
                    color: '#a4a4a4',
                  }}>
                  Post
                </Text>
              </Pressable>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextInput
                style={{
                  fontSize: width * 0.04,
                  textAlignVertical: 'top',
                }}
                placeholder="What do you want to talk about?"
                placeholderTextColor="#666"
                className="text-black font-medium py-0 mt-5"
                autoCapitalize="none"
                autoCorrect={false}
                multiline={true}
              />
            </ScrollView>
            <Pressable className="mb-4">
              <ImageIcon width={25} height={23} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}
