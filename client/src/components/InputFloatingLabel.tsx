import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, TextInput, View} from 'react-native';

const {width, height} = Dimensions.get('screen');

interface InputFloatingLabelProps {
  label: string;
  visible?: boolean;
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
}

function InputFloatingLabel({
  label,
  visible,
  data,
  setData,
}: InputFloatingLabelProps): React.JSX.Element {
  const animatedLabelEmailPhonePosition = useRef(
    new Animated.Value((height * 0.06) / 2 - (width * 0.04) / 2 - 4),
  ).current;

  useEffect(() => {
    // const toValue = emailPhone !== '' ? 0 : 16;
    const toValue =
      data !== '' ? 0 : (height * 0.06) / 2 - (width * 0.04) / 2 - 4;

    Animated.timing(animatedLabelEmailPhonePosition, {
      toValue,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animatedLabelEmailPhonePosition, data]);

  return (
    <View className="relative">
      <Animated.Text
        style={{
          top: animatedLabelEmailPhonePosition,
          fontSize: data !== '' ? width * 0.035 : width * 0.04,
          left: 8,
        }}
        className="absolute text-[#676767] font-medium">
        {label}
      </Animated.Text>
      <TextInput
        className="w-max border rounded-[4px] font-semibold px-2"
        style={{
          height: height * 0.06,
          fontSize: width * 0.04,
          paddingTop:
            data !== ''
              ? (height * 0.06) / 2 - (width * 0.04) / 2
              : (height * 0.06) / 2 - (width * 0.04) / 2 - 8,
        }}
        autoCapitalize="none"
        secureTextEntry={visible}
        autoCorrect={false}
        value={data}
        onChangeText={value => setData(value)}
      />
    </View>
  );
}

export default InputFloatingLabel;
