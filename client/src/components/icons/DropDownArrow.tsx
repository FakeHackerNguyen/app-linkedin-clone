import React from 'react';
import {Svg, Polygon, Path} from 'react-native-svg';

export default function DropDownArrow(): React.JSX.Element {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24">
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
