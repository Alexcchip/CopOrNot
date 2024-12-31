import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const WTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle
      cx={45.00031195}
      cy={44.99968405}
      fill="#fccc0a"
      r={45.00028575}
      strokeWidth={1.02285}
    />
    <Path
      d="m6.511-10.655 5.006 21.667 1.079 6.032 1.103-5.904 4.262-21.795h8.343l4.493 21.667 1.155 6.032 1.155-5.801 5.057-21.898h8.036l-10.654 37.84h-7.548l-4.569-22.129-1.335-7.317-1.335 7.317-4.569 22.129h-7.343l-10.73-37.84z"
      fillRule="nonzero"
      transform="matrix(1.26802 0 0 1.26802 16.9029 34.5201)"
    />
  </Svg>
);
export default WTrain;
