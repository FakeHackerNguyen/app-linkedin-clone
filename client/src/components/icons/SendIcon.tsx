import React from 'react';
import {Svg, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color: string;
};

export default function SendIcon({
  width,
  height,
  color,
}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
      <Path
        d="M9.00001 12L20 1M9.00001 12L12.5 19C12.5439 19.0957 12.6143 19.1769 12.703 19.2338C12.7916 19.2906 12.8947 19.3209 13 19.3209C13.1053 19.3209 13.2084 19.2906 13.2971 19.2338C13.3857 19.1769 13.4561 19.0957 13.5 19L20 1M9.00001 12L2.00001 8.5C1.90427 8.45613 1.82314 8.38569 1.76626 8.29705C1.70938 8.20842 1.67914 8.10532 1.67914 8C1.67914 7.89468 1.70938 7.79158 1.76626 7.70295C1.82314 7.61431 1.90427 7.54387 2.00001 7.5L20 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}