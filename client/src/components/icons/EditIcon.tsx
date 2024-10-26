import React from 'react';
import {Svg, Path} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
};

export default function EditIcon({width, height}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
      <Path
        d="M13.8444 3.31104H4.63209C3.93402 3.31104 3.26453 3.58834 2.77092 4.08196C2.27731 4.57557 2 5.24505 2 5.94312V24.3677C2 25.0658 2.27731 25.7353 2.77092 26.2289C3.26453 26.7225 3.93402 26.9998 4.63209 26.9998H23.0567C23.7548 26.9998 24.4243 26.7225 24.9179 26.2289C25.4115 25.7353 25.6888 25.0658 25.6888 24.3677V15.1554"
        stroke="#666666"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M22.2342 2.81768C22.7577 2.29413 23.4678 2 24.2082 2C24.9486 2 25.6587 2.29413 26.1823 2.81768C26.7058 3.34124 27 4.05133 27 4.79175C27 5.53217 26.7058 6.24226 26.1823 6.76582L13.8444 19.1037L8.5802 20.4198L9.89624 15.1556L22.2342 2.81768Z"
        stroke="#666666"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
