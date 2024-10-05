import React from 'react';
import {Svg, Path} from 'react-native-svg';

export default function HomeIcon({color}: {color: string}): React.JSX.Element {
  return (
    <Svg width="35" height="30" viewBox="0 0 35 30" fill="none">
      <Path
        d="M14 30V19.4118H21V30H29.75V15.8824H35L17.5 0L0 15.8824H5.25V30H14Z"
        fill={color}
      />
    </Svg>
  );
}
