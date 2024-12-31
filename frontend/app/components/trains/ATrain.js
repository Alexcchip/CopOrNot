import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ATrain = ({width = 50, height = 50, ...props}) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.41421}
    viewBox="0 0 90 90"
    xmlns="http://www.w3.org/2000/svg"
    width = {width}
    height = {height}
    {...props}
  >
    <Circle cx={45} cy={45} fill="#2852ad" r={45} />
    <Path
      d="m39.1243 50.8594h12.1745l-5.9896-18.8802zm.6185-29.8503h11.3282l16.9922 47.9818h-10.8724l-3.0925-9.8633h-17.6758l-3.3203 9.8633h-10.4818z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default ATrain;
