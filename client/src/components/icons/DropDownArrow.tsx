import React from 'react';
import {Svg, Polygon, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
};

export default function DropDownArrow({
  width,
  height,
}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polygon points="6 9 12 15 18 9" />
    </Svg>
  );
}
