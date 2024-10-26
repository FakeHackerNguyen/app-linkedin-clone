import React, {useCallback, useState} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Store} from '../../../redux/store';
import {calculateTimeAgo} from '../../../utils';
import PublicIcon from '../../../components/icons/PublicIcon';
import PlusIcon from '../../../components/icons/PlusIcon';
import RepostIcon from '../../../components/icons/RepostIcon';
import CommentIcon from '../../../components/icons/CommentIcon';
import SendIcon from '../../../components/icons/SendIcon';
import LikeIcon from '../../../components/icons/LikeIcon';

const {width} = Dimensions.get('screen');

type PostProps = {
  data: string;
};

export default function Post({data}: PostProps): React.JSX.Element {
  const {user} = useSelector((state: Store) => state.auth);
  const [isFollowPressed, setIsFollowPressed] = useState(false);
  const [isTextExpanded, setIsTextExpanded] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const onTextLayout = useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
  }, []);

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="mt-5 flex-row items-center border-t border-[#eaeaea] mx-3 pt-2">
        <Image
          className="rounded-full w-12 h-12"
          source={{uri: user?.avatar.url}}
        />
        <Pressable className="ml-3 flex-col flex-1">
          <View className="flex-row items-center">
            <Text
              className="text-black font-extrabold"
              style={{
                fontSize: width * 0.04,
              }}>
              {user?.fullName}
            </Text>
            <View className="bg-[#676767] w-1 h-1 rounded-full mx-1.5" />
            <Text
              className="text-[#666] font-semibold"
              style={{
                fontSize: width * 0.03,
              }}>
              3rd+
            </Text>
          </View>

          <Text
            style={{
              fontSize: width * 0.03,
            }}
            className="font-semibold text-[#666]">
            {user?.headline}
          </Text>
          <View className="flex-row items-center">
            <Text
              style={{
                fontSize: width * 0.03,
              }}
              className="font-semibold text-[#666]">
              {calculateTimeAgo('2024-10-09T13:54:43.422Z')}
            </Text>
            <View className="bg-[#676767] w-1 h-1 rounded-full mx-1.5" />
            <PublicIcon width={15} height={15} />
          </View>
        </Pressable>
        <Pressable
          onPressIn={() => setIsFollowPressed(true)}
          onPressOut={() => setIsFollowPressed(false)}
          style={{
            backgroundColor: isFollowPressed ? '#DAE7F8' : 'transparent',
          }}
          className="flex-row self-start p-1 rounded-[4px]">
          <PlusIcon width={20} height={20} color="#2D64BC" />
          <Text
            style={{
              fontSize: width * 0.035,
            }}
            className="text-[#2D64BC] font-extrabold">
            Follow
          </Text>
        </Pressable>
      </View>
      {/* Content */}
      <View className="mx-3 mt-2">
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={isTextExpanded ? 0 : 2}
          ellipsizeMode="clip"
          style={{
            fontSize: width * 0.035,
          }}
          className=" text-black font-medium">
          in design, perfection doesn't mean harmony AddingAvataraa
          AddingAvataraa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </Text>
        {lengthMore && !isTextExpanded ? (
          <Text
            onPress={() => setIsTextExpanded(true)}
            style={{
              fontSize: width * 0.035,
            }}
            className="text-[#666] font-semibold">
            ...See more
          </Text>
        ) : null}
      </View>
      <Image
        className="w-full h-[400px] mt-3"
        source={{uri: user?.avatar.url}}
      />
      <View className="flex-row items-center my-2 mx-3">
        <View className="flex-row items-center gap-2 flex-1">
          <Image
            className="w-5 h-5"
            source={require('../../../assets/icons/like.png')}
          />
          <Text
            className="text-[#666] font-semibold"
            style={{
              fontSize: width * 0.035,
            }}>
            144
          </Text>
        </View>
        <View className="flex-row items-center">
          <Text
            className="text-[#666] font-semibold"
            style={{
              fontSize: width * 0.035,
            }}>
            31 comments
          </Text>
          <View className="bg-[#676767] w-1 h-1 rounded-full mx-1.5" />
          <Text
            className="text-[#666] font-semibold"
            style={{
              fontSize: width * 0.035,
            }}>
            5 reposts
          </Text>
        </View>
      </View>
      <View className="flex-row items-center justify-around border-t border-[#eaeaea] py-2.5">
        <Pressable className="flex-col items-center">
          <LikeIcon width={25} height={25} />
          <Text
            className="text-[#666] font-extrabold"
            style={{
              fontSize: width * 0.035,
            }}>
            Like
          </Text>
        </Pressable>
        <Pressable className="flex-col items-center">
          <CommentIcon width={25} height={25} />
          <Text
            className="text-[#666] font-extrabold"
            style={{
              fontSize: width * 0.035,
            }}>
            Comment
          </Text>
        </Pressable>
        <Pressable className="flex-col items-center">
          <RepostIcon width={25} height={25} />
          <Text
            className="text-[#666] font-extrabold"
            style={{
              fontSize: width * 0.035,
            }}>
            Repost
          </Text>
        </Pressable>

        <Pressable className="flex-col items-center">
          <SendIcon width={25} height={25} color="#666" />
          <Text
            className="text-[#666] font-extrabold"
            style={{
              fontSize: width * 0.035,
            }}>
            Send
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
