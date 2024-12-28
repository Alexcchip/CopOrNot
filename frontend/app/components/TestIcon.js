import * as React from "react";
import {Svg, Path, Circle} from "react-native-svg";

const TestIcon = ({width = 90, height = 90, ...props}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
    clipRule="evenodd"
    viewBox="0 0 90 90"
    width = {width}
    height = {height}
    {...props}
  >
    <Circle cx="45" cy="45" r="45" fill="#ff6219"></Circle>
    <Path
      fill="#fff"
      fillRule="nonzero"
      d="M29.717 21.074h34.017v8.431H39.678V40.54h21.06v8.334h-21.06V68.99h-9.961z"
    ></Path>
  </Svg>
);

export default TestIcon;
