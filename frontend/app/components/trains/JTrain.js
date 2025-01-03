import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const JTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#996433" r={45} />
    <Path
      d="m37.3991 50.7943v1.1067c.0868 3.711.4937 6.3206 1.2207 7.8288.727 1.5083 2.2841 2.2624 4.6712 2.2624 2.3655 0 3.928-.8247 4.6875-2.474.4557-.9765.6836-2.6258.6836-4.9479v-33.5612h10.0261v33.3985c0 4.0798-.7053 7.3133-2.1159 9.7005-2.3872 4.0364-6.6949 6.0547-12.9232 6.0547s-10.4058-1.6331-12.5326-4.8991c-2.1267-3.2661-3.1901-7.7203-3.1901-13.3627v-1.1067z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default JTrain;
