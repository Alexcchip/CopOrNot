import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ZTrain = ({width = 50, height = 50, ...props}) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.41421}
    viewBox="0 0 90 90"
    xmlns="http://www.w3.org/2000/svg"
    height = {height}
    width = {width}
    {...props}
  >
    <Circle cx={45} cy={45} fill="#996433" r={45} />
    <Path
      d="m26.3314 60.5273 24.7721-31.0221h-24.1536v-8.4961h36.6536v8.0404l-25.0976 31.4778h25.1627v8.4636h-37.3372z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default ZTrain;
