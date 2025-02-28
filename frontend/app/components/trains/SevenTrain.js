import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const SevenTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#b933ae" r={45} />
    <Path
      d="m61.6178 29.668c-1.3889 1.3672-3.3203 3.8031-5.7942 7.3079-2.474 3.5048-4.5465 7.1235-6.2175 10.8561-1.3238 2.9297-2.5173 6.5104-3.5807 10.7422s-1.5951 7.704-1.5951 10.4167h-9.6354c.2821-8.4636 3.0599-17.2635 8.3334-26.3998 3.4071-5.664 6.2608-9.6137 8.5612-11.8489h-23.5352l.1302-8.3333h33.3333z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default SevenTrain;
