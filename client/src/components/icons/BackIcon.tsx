import React from 'react';
import {Svg, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color: string;
};

export default function BackIcon({
  width,
  height,
  color,
}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24">
      <Path
        d="M6 12h12M6 12l4-4m-4 4l4 4"
        stroke={color} // Color of the arrow
        strokeWidth="1" // Width of the arrow
        fill="none" // No fill color
        strokeLinecap="round" // Rounded edges for the stroke
        strokeLinejoin="round" // Rounded edges for the joints
      />
    </Svg>
  );
}
