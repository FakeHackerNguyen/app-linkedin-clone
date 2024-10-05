import React from 'react';
import {Svg, Path} from 'react-native-svg';

function BackIcon(): React.JSX.Element {
  return (
    <Svg width="40" height="40" viewBox="0 0 24 24">
      <Path
        d="M6 12h12M6 12l4-4m-4 4l4 4"
        stroke="#666" // Color of the arrow
        strokeWidth="1" // Width of the arrow
        fill="none" // No fill color
        strokeLinecap="round" // Rounded edges for the stroke
        strokeLinejoin="round" // Rounded edges for the joints
      />
    </Svg>
  );
}

export default BackIcon;
