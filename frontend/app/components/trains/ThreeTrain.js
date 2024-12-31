import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const ThreeTrain = ({width = 50, height = 50, ...props}) => (
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
      d="m37.334 54.5052c0 1.888.3038 3.4505.9114 4.6875 1.1285 2.2787 3.1793 3.418 6.1524 3.418 1.8229 0 3.4125-.6239 4.7689-1.8718 1.3563-1.2478 2.0345-3.0436 2.0345-5.3873 0-3.1033-1.2587-5.1758-3.7761-6.2175-1.4323-.5859-3.6892-.8789-6.7708-.8789v-6.6406c3.0165-.0434 5.1215-.3364 6.3151-.8789 2.0616-.9115 3.0924-2.7561 3.0924-5.5339 0-1.8012-.5262-3.266-1.5787-4.3945s-2.5337-1.6927-4.4434-1.6927c-2.1918 0-3.8032.6944-4.834 2.0833s-1.5245 3.2444-1.4811 5.5664h-8.6588c.0868-2.3437.4882-4.5681 1.2044-6.6732.7595-1.8446 1.9531-3.5481 3.5807-5.1106 1.2153-1.1068 2.6584-1.9532 4.3294-2.5391s3.7218-.8789 6.1524-.8789c4.5139 0 8.1543 1.1664 10.9212 3.4993s4.1504 5.4634 4.1504 9.3913c0 2.7778-.8247 5.1216-2.474 7.0313-1.0416 1.1936-2.1267 2.0074-3.2552 2.4414.8464 0 2.0617.727 3.6459 2.181 2.3654 2.1918 3.5481 5.1866 3.5481 8.9843 0 3.9931-1.3834 7.5033-4.1503 10.5306-2.767 3.0274-6.8631 4.5411-12.2885 4.5411-6.684 0-11.3281-2.181-13.9323-6.543-1.3671-2.3221-2.1267-5.3603-2.2786-9.1146z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default ThreeTrain;