import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const FTrain = ({width = 50, height = 50, ...props}) => (
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
      d="m29.7168 21.0742h34.0169v8.431h-24.056v11.0352h21.0612v8.3333h-21.0612v20.1172h-9.9609z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default FTrain;
