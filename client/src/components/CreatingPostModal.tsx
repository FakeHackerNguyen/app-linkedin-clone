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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, Store} from '../redux/store';
import DropDownArrow from './icons/DropDownArrow';
import ImageIcon from './icons/ImageIcon';
import {launchImageLibrary} from 'react-native-image-picker';
import {createPost} from '../redux/actions/postAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('screen');

type CreatingPostModalProps = {
  slideAnim: Animated.Value;
  isModalVisible: boolean;
  onCloseModal: () => void;
};

type Post = {
  content: string;
  media: string;
  visibility: string;
  commentControl: string;
};

export default function CreatingPostModal({
  slideAnim,
  isModalVisible,
  onCloseModal,
}: CreatingPostModalProps): React.JSX.Element {
  const [isClosePressed, setIsClosePressed] = useState(false);
  const [isControlPostPressed, setIsControllPostPressed] = useState(false);
  const [isPostPressed, setIsPostPressed] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [post, setPost] = useState<Post>({
    content: '',
    media: '',
    visibility: 'Anyone',
    commentControl: 'Anyone',
  });
  const dispath: AppDispatch = useDispatch();
  const {user} = useSelector((state: Store) => state.auth);

  const handleImageSelect = () => {
    launchImageLibrary(
      {
        mediaType: 'mixed',
        includeBase64: false,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          console.log(asset.uri);
          setSelectedFile(asset.uri || null);
        } else {
          // Handle any other case here (for example, when the user has no access to photos)
        }
      },
    );
  };

  const handlePost = async () => {
    const formData = new FormData();
    const type = `video/${selectedFile?.split('.')[2]}`;
    formData.append('content', post.content);
    formData.append('file', {
      uri: selectedFile,
      type,
      name: 'post',
    });
    formData.append('visibility', post.visibility);
    formData.append('commentControl', post.commentControl);

    const accessToken = (await AsyncStorage.getItem('accessToken')) as string;
    await dispath(createPost({formData, accessToken}));
    // onCloseModal();
  };

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
                  onPress={() => {
                    onCloseModal();
                    setPost({
                      content: '',
                      media: '',
                      visibility: 'Anyone',
                      commentControl: 'Anyone',
                    });
                  }}>
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
                disabled={!post.content}
                onPress={handlePost}
                onPressIn={() => setIsPostPressed(true)}
                onPressOut={() => setIsPostPressed(false)}
                className="rounded-full px-4 py-2"
                style={{
                  backgroundColor: post.content
                    ? isPostPressed
                      ? '#1B4F8A'
                      : '#2D64BC'
                    : '#eaeaea',
                }}>
                <Text
                  className="font-bold"
                  style={{
                    fontSize: width * 0.04,
                    color: !post.content ? '#a4a4a4' : '#fff',
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
                value={post.content}
                onChangeText={(value: string) =>
                  setPost({...post, content: value})
                }
              />
            </ScrollView>
            <Pressable onPress={handleImageSelect} className="mb-4">
              <ImageIcon width={25} height={23} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
}
