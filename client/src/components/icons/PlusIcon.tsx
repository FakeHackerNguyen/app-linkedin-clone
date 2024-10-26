import React from 'react';
import {Svg, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
  color: string;
};

export default function PlusIcon({
  width,
  height,
  color,
}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M23.75 16.2476H16.25V23.7476H13.75V16.2476H6.25V13.7476H13.75V6.24756H16.25V13.7476H23.75V16.2476Z"
        fill={color}
      />
    </Svg>
  );
}
