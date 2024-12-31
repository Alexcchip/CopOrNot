import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const OneTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#ee342e" r={45} />
    <Path
      d="m31.084 36.4388v-6.3151c2.9297-.1302 4.9805-.3255 6.1523-.5859 1.8663-.4124 3.3854-1.237 4.5573-2.474.803-.8464 1.4106-1.9748 1.8229-3.3854.2388-.8464.3581-1.4757.3581-1.888h7.7149v47.2005h-9.5053v-32.5521z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);

export default OneTrain;
