import React from 'react';
import {Svg, Path} from 'react-native-svg';

export default function NotificationIcon({
  color,
}: {
  color: string;
}): React.JSX.Element {
  return (
    <Svg width="28" height="30" viewBox="0 0 28 28" fill="none">
      <Path
        d="M14 28C15.925 28 17.5 26.7077 17.5 25.1282H10.5C10.5 26.7077 12.0575 28 14 28ZM24.5 19.3846V12.2051C24.5 7.79692 21.63 4.10667 16.625 3.13026V2.15385C16.625 0.962051 15.4525 0 14 0C12.5475 0 11.375 0.962051 11.375 2.15385V3.13026C6.3525 4.10667 3.5 7.78256 3.5 12.2051V19.3846L0 22.2564V23.6923H28V22.2564L24.5 19.3846Z"
        fill={color}
      />
    </Svg>
  );
}
