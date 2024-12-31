import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const LTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#a7a9ac" r={45} />
    <Path
      d="m29.7168 21.0091h10.026v39.3555h23.7631v8.6263h-33.7891z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default LTrain;
