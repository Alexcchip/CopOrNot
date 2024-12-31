import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ETrain = ({width = 50, height = 50, ...props}) => (
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
      d="m63.3268 29.5052h-25.3906v10.1888h23.3073v8.3333h-23.3073v12.3373h26.5625v8.6263h-36.3607v-47.9818h35.1888z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default ETrain;
