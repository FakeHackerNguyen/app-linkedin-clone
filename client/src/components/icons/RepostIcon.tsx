import React from 'react';
import {Svg, Use, Image, Rect, Defs, Pattern} from 'react-native-svg';

type Props = {
  width: number;
  height: number;
};

export default function RepostIcon({width, height}: Props): React.JSX.Element {
  return (
    <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
      <Rect width={width} height={height} fill="url(#pattern0_23_119)" />
      <Defs>
        <Pattern
          id="pattern0_23_119"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use xlinkHref="#image0_23_119" transform="scale(0.0208333)" />
        </Pattern>
        <Image
          id="image0_23_119"
          width={35}
          height={35}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADIElEQVR4nO1Zy2oUQRQtfOJj4Rt8xZ8wxtdPKLa4CIRM6pyaSchiVjFCGMGoOzGo+AdRYwTRLzFmJwpR0YkxLlRI4sLIZcowqdQk/ZxJwxwoaGjq1rnVt+69fUqpNtpoIzEqlcoWrfVZkjcAvCA5DeAHyT8kl+zzFMlJkteNMWdkjooIADdVmtBanyB5F8BnkssRxwzJUZJHw5KXeakQHxgYOAjgsexuDOLuWCA51tPTs28j8qk4AOAagO8pEHdHVWt9aT3yiRyoVCrb7K43IvATwLjWGgA6e3t7D5PcLkOeJe4BGABPAfxqYOMvyXtBEGz1kY/tQLlc3kXydYNFv5Asktwd1l53d/cekgTwvoHNSQC3fO9i7byPPIBFkiNCRsVEEAQ7JHNFOUuRF/GFDYCvJM+plEDyIoDZ1B2QA+sh/7ZUKp1UKaNQKJwi+S01B/r6+g6QnHMzRRbkGx3YRA54QmchzbCJQ55hHbAV1j1YI60mz7AOSHvgpsok2SYt8gzjgBQRT29T3AzkGcYB21WuqrBRilTLwVphqU+b4ypPQK2fX3FAehuVJ5Ccdr5Ap8oTSM47Z+CQyhPo5H9puFSewE3kwODg4E4nnBdzFULFYvGIw2Uu8iGWPynVIui1NWkqV2kUgHFC6HmYScOO109Ui0BywuEyFGZS12ZoJfr7+/eS/O1wOb3hRFHMSH5yJmrVZLCGeg4zodU8knecye9EHlHNTZ8fHA6joQ0YY45b1SFa/GXUUJJcKBQKx6IaeeQWEQDnM2Ndp1B4/gbHVFTYn3pXJaiS7FAZgWSHXaN+42ZLpdL+WAa11ld9skoWTrBGflURteNyIsMAHnqMVo0xF5ogbN1PbNyKuq88X0LOxHCSZi9YR1oE8PK/yJsYIu76nLALiUDLKKqFLVICN1WukJc1VZqwIu+DRmqBlcyf2f6lSzpJ2WEZtqvssir2hKfCLtdnnNR23gdjzJWwQmzEUU18YMNC0pp8DU+xy+SKKTNIdQRwG8DHrC/5MoU0WfLjI1eo0rPbK9V5m12W7PMb+25IlI4416xttNGGWoN/O0nSgh0HtzIAAAAASUVORK5CYII="
        />
      </Defs>
    </Svg>
  );
}
