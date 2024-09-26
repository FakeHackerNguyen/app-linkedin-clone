import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Animated,
  View,
  Image,
  Text,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import slides from '../data/slides.js';
import Logo from '../components/Logo';

type Slide = {
  _id: number;
  image: any;
  title: string;
};

const {width, height} = Dimensions.get('screen');

function Pagination({
  data,
  scrollX,
}: {
  data: Slide[];
  scrollX: Animated.Value;
}): React.JSX.Element {
  return (
    <View className="flex flex-row items-center justify-center">
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];
        const dotColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#fff', '#000', '#fff'],
        });
        return (
          <Animated.View
            className="rounded-full border-[1px] border-black mx-2"
            style={{
              backgroundColor: dotColor,
              width: width * 0.02,
              height: height * 0.01,
            }}
            key={idx.toString()}
          />
        );
      })}
    </View>
  );
}

function SliderItem({item}: {item: Slide}): React.JSX.Element {
  return (
    <View
      style={{
        width: width,
        height: height * 0.45,
      }}
      className="flex items-center justify-center relative">
      <Image
        style={{
          width: width * 0.6,
          height: height * 0.8,
        }}
        source={item.image}
        resizeMode="contain"
      />
      <Text
        className="text-black text-center absolute bottom-6 font-semibold"
        style={{
          fontSize: width * 0.045,
        }}>
        {item.title}
      </Text>
    </View>
  );
}

function Slider(): React.JSX.Element {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<Slide>>(null);
  const [page, setPage] = useState<number>(0);

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextPage = (page + 1) % slides.length;
      setPage(nextPage);
      flatListRef.current?.scrollToIndex({index: nextPage, animated: true});
    }, 3000);

    return () => clearInterval(intervalId);
  }, [page]);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={({item}) => <SliderItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
      />
      <Pagination data={slides} scrollX={scrollX} />
    </View>
  );
}

function Intro(): React.JSX.Element {
  return (
    <SafeAreaView className="bg-white flex-1">
      <Logo />
      <Slider />
      <View
        style={{
          marginHorizontal: width * 0.1,
          marginTop: height * 0.03,
        }}>
        <Text className="text-[#5F5F5F] font-medium">
          By clicking Agree & Join or Continue, you agree to SocialJob's{' '}
          <Text className="text-[#2D64BC]">
            User Agreement, Privacy Policy{' '}
            <Text className="text-[#5F5F5F]">and</Text> Cookie Policy.
          </Text>
        </Text>
      </View>
      <View className="flex items-center justify-center">
        <Pressable
          style={{
            width: width * 0.85,
            height: height * 0.05,
            borderRadius: width * 0.05,
            marginTop: height * 0.02,
          }}
          className="bg-[#2D64BC] items-center justify-center">
          <Text
            style={{
              fontSize: width * 0.045,
            }}
            className="text-white font-bold">
            Agree & Join
          </Text>
        </Pressable>
      </View>
      <View className="flex items-center justify-center">
        <Pressable
          style={{
            width: width * 0.85,
            height: height * 0.05,
            borderRadius: width * 0.05,
            marginTop: height * 0.02,
          }}
          className="bg-transparent items-center justify-center">
          <Text
            style={{
              fontSize: width * 0.045,
            }}
            className="text-[#2D64BC] font-bold">
            Sign in
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Intro;
