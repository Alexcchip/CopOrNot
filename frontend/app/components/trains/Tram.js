import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const TRAM = ({width = 50, height = 50, ...props}) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.41421}
    viewBox="0 0 90 90"
    xmlns="http://www.w3.org/2000/svg"
    height= {height}
    width= {width}
    {...props}
  >
    <Circle cx={45} cy={45} fill="#00aeef" r={45}
    />
    <Path
      d="m37.6-10.655v6.7h-11.322v31.14h-7.958v-31.14h-11.372v-6.7z"
      fill="#fff"
      fillRule="nonzero"
      transform="matrix(1.26802 0 0 1.26802 16.9029 34.5201)"
    />
  </Svg>
);
export default TRAM;