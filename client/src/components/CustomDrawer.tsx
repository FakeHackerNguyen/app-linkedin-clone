import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {View, Text, Image, Dimensions, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SettingIcon from './icons/SettingIcon';

const {width, height} = Dimensions.get('screen');

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const [isSettingsPressed, setIsSettingsPressed] = useState(false);
  const {navigation} = props;

  return (
    <SafeAreaView className="bg-white flex-1">
      <DrawerContentScrollView
        {...props}
        style={{
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}>
        <View className="border-b border-[#eaeaea] pb-2">
          <Image
            style={{width: width * 0.15, height: width * 0.15}}
            className="rounded-full"
            source={{
              uri: 'https://res.cloudinary.com/myshop-it/image/upload/v1709004468/avatars/default-avatar.png',
            }}
          />
          <Text
            style={{
              fontSize: width * 0.05,
            }}
            className="text-black font-extrabold mt-2">
            Nguyen Toan
          </Text>
          <Text
            style={{
              fontSize: width * 0.035,
            }}
            className="text-[#666] font-bold">
            View profile
          </Text>
        </View>
        {/* <DrawerItemList {...props} /> */}
      </DrawerContentScrollView>
      <View className="border-t border-[#eaeaea] py-4">
        <Pressable
          className="px-4 py-2"
          onPressIn={() => setIsSettingsPressed(true)}
          onPressOut={() => setIsSettingsPressed(false)}
          style={{
            backgroundColor: isSettingsPressed ? '#e0e0e0' : 'transparent',
          }}>
          <View className=" flex-row items-center ">
            <SettingIcon />
            <Text
              style={{
                fontSize: width * 0.05,
              }}
              className="text-black font-extrabold pl-2">
              Settings
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
