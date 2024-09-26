import React from 'react';
import {Dimensions, Image} from 'react-native';

function Logo(): React.JSX.Element {
  const {height} = Dimensions.get('screen');
  return (
    <Image
      style={{
        marginTop: height * 0.05,
      }}
      className="w-[187px] h-[70px]"
      resizeMode="cover"
      source={require('../assets/images/logo.png')}
    />
  );
}

export default Logo;
