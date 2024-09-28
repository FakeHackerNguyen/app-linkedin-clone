import React from 'react';
import {Image} from 'react-native';

function Logo(): React.JSX.Element {
  return (
    <Image
      className="w-[187px] h-[70px]"
      resizeMode="cover"
      source={require('../assets/images/logo.png')}
    />
  );
}

export default Logo;
