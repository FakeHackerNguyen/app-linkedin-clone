import React from 'react';
import {Svg, Rect, Defs, Pattern, Image, Use} from 'react-native-svg';

export default function ChatIcon(): React.JSX.Element {
  return (
    <Svg width="30" height="25" viewBox="0 0 40 30" fill="none">
      <Rect width="40" height="30" fill="url(#pattern0_23_150)" />
      <Defs>
        <Pattern
          id="pattern0_23_150"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1">
          <Use
            xlinkHref="#image0_23_150"
            transform="matrix(0.015625 0 0 0.0208333 0.125 0)"
          />
        </Pattern>
        <Image
          id="image0_23_150"
          width="48"
          height="48"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACeUlEQVR4nO2Zu4sTURTGrxZa+MBHpzYiVuI/IIKID4TVwiKiGIxOZr5vkjCldawUe6vFF9iuna6tnYughVooFrIsgutjy6yr7l45eGGWkDh3knncgXxwIGQe+X333pP7OEpNNNFEY6vdbm8Nw/AsyVsAngJ4D2AJwG8TS+Y7uXZT7q3X61tUydoA4DTJxwB6JHWakGcAzJA8Je8qlBzAOZLv0kL/J94AmModnORekrMZguu+eOJ53p5c4IMgOEnyR47w2gyt7wBOZApP8qokY97wjE3Ib13JBB5AA8BqUfCMTawCqI8FHwTBMZK/ioZnHCsAjo4E32g0dpBcKBFem5743Gq1dqY2QPJ+2fCMTUynggdwuIxxz+Hxx/f9Q2la/5ED0LqvFx5YwTebzV0klx000JO8tGn9S2XDcnhcSDQA4K4DoHrkZCb50mEDL2wMfLV52YDnMr3OwQYWbQysOGzgZ6IBuclVAySXbQwsOmzgS6IBknN5J+MYMWfTA9MOgOohOXAv0UAYhhfLBuWQCMPQSzQg07VtIhcca7InTzRg8uChA8C6L56rNMtpWcI6AK3XxWVrAw4m83ytVtuUykCn09ntwpaS//59rqmKbuq1GfujHz2a/cFaSS3fI3lQjSvpwiIPthgbuD42/DoTZ0h+KxB+JvNTa9/395F8VoCBV7nWD0ieB/A2J/gFaShVUIFjyhQ4slp6zAM4oIpWFEXbpWwE4LaUkUh+kLKSzOZiznxOGvOffN/fr1xVAvxr64WagwZmpQeV6xrQ6jKv3Oh2uxtVFdQ/3oMgOKKqJAMuJ953PM/bpqomAB8BHFdVVRRFm8tmUC7qL5MNAW/+59n1AAAAAElFTkSuQmCC"
        />
      </Defs>
    </Svg>
  );
}
