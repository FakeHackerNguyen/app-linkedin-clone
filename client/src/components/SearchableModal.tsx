import React, {useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  TextInput,
  Text,
  View,
  Image,
} from 'react-native';
import {Company, School} from '../screens/features/user/Register.AddingProfile';

const {height, width} = Dimensions.get('screen');
type SearchableModalProps = {
  slideAnim: Animated.Value;
  isModalVisible: boolean;
  modalType: string;
  query: string;
  onCloseModal: () => void;
  onHandleChangeQuery: (value: string) => void;
  data: (string | Company | School)[];
  onSelect: (item: string | Company | School) => void;
};
let placeholder: string;

export default function SearchableModal({
  slideAnim,
  isModalVisible,
  onCloseModal,
  modalType,
  query,
  onHandleChangeQuery,
  data,
  onSelect,
}: SearchableModalProps) {
  const [isClosePressed, setIsClosePressed] = useState(false);

  if (modalType === 'Location') {
    placeholder = 'Location';
  } else if (modalType === 'Job Title') {
    placeholder = 'Title (ex: Retail Sales Manager)';
  } else if (modalType === 'Company') {
    placeholder = 'Company name (ex: Microsoft)';
  } else if (modalType === 'School') {
    placeholder = 'School name (ex: Boston University)';
  }

  return (
    <Modal visible={isModalVisible} transparent={true} animationType="none">
      <Animated.View
        className="bg-white h-full w-full absolute"
        style={{
          transform: [{translateY: slideAnim}],
        }}>
        <View
          style={{
            marginTop: height * 0.04,
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
              {modalType}
            </Text>
          </View>
        </View>

        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#676767"
          className="text-[#676767] border-t border-b border-[#eaeaea] font-medium mt-3 px-4"
          style={{
            fontSize: width * 0.035,
          }}
          value={query}
          onChangeText={onHandleChangeQuery}
        />
        <FlatList
          data={data}
          keyExtractor={item => {
            if (modalType === 'Location' || modalType === 'Job Title') {
              return item as string;
            } else {
              return (item as Company | School).name;
            }
          }}
          renderItem={({item}) => {
            if (modalType === 'Location' || modalType === 'Job Title') {
              return (
                <Pressable onPress={() => onSelect(item)}>
                  <Text
                    className="text-black font-extrabold border-b border-[#eaeaea] p-3.5"
                    style={{
                      fontSize: width * 0.038,
                    }}>
                    {item as string}
                  </Text>
                </Pressable>
              );
            } else {
              return (
                <Pressable
                  className="border-b border-[#eaeaea] flex-row p-2 items-center"
                  onPress={() => onSelect(item)}>
                  <Image
                    className="w-12 h-12"
                    source={{uri: (item as Company | School).avatar.url}}
                  />
                  <View className="flex-col flex-1 pl-3">
                    <Text
                      className="text-black font-extrabold"
                      style={{
                        fontSize: width * 0.038,
                      }}>
                      {(item as Company | School).name}
                    </Text>
                    <View className="flex-1 flex-row items-center gap-2">
                      <Text
                        style={{
                          fontSize: width * 0.038,
                        }}
                        className="text-[#676767] font-semibold">
                        {modalType}
                      </Text>
                      <View className="bg-[#676767] w-1 h-1 rounded-full" />
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-[#676767] font-semibold flex-shrink"
                        style={{
                          fontSize: width * 0.038,
                        }}>
                        {modalType === 'Company'
                          ? (item as Company).typeOfBusiness
                          : (item as School).region}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            }
          }}
          className="bg-white w-full border-l border-b border-r border-gray-300 mt-1 z-50"
        />
      </Animated.View>
    </Modal>
  );
}
