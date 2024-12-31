import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const MTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#ff6219" r={45} />
    <Path
      d="m54.1146 21.0091h14.4206v47.9818h-9.3425v-32.4544c0-.9332.0109-2.2407.0326-3.9226.0217-1.6818.0325-2.9785.0325-3.8899l-9.082 40.2669h-9.7331l-9.0169-40.2669c0 .9114.0108 2.2081.0325 3.8899.0217 1.6819.0326 2.9894.0326 3.9226v32.4544h-9.3425v-47.9818h14.5834l8.7239 37.7279z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default MTrain;
