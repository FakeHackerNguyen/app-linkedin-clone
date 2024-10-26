import React from 'react';
import {Svg, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
};

export default function NextIcon({width, height}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 28 23" fill="none">
      <Path
        d="M0.5 12H25.5M25.5 12L14.25 2M25.5 12L14.25 22"
        stroke="#666666"
        strokeWidth="3"
      />
    </Svg>
  );
}
