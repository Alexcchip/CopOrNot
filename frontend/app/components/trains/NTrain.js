import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const NTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#fccc0a" r={45} />
    <Path
      d="m25.8431 21.0091h10.5143l19.1081 33.4961v-33.4961h9.3424v47.9818h-10.026l-19.5964-34.082v34.082h-9.3424z"
      fillRule="nonzero"
    />
  </Svg>
);
export default NTrain;
