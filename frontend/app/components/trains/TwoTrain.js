import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const TwoTrain = ({width = 50, height = 50, ...props}) => (
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
      d="m30.7259 59.7135c1.3238-3.1467 4.4488-6.4778 9.375-9.9934 4.2752-3.0599 7.0421-5.2518 8.3008-6.5756 1.9314-2.0616 2.8971-4.3185 2.8971-6.7708 0-1.9965-.5534-3.6567-1.6601-4.9805-1.1068-1.3238-2.691-1.9856-4.7526-1.9856-2.8212 0-4.7418 1.0525-5.7618 3.1575-.5859 1.2153-.9331 3.1467-1.0416 5.7943h-9.0169c.1519-4.0148.8789-7.2591 2.1809-9.7331 2.474-4.7092 6.8685-7.0638 13.1836-7.0638 4.9914 0 8.9627 1.3835 11.9141 4.1504s4.4271 6.429 4.4271 10.9863c0 3.4939-1.0417 6.5972-3.125 9.3099-1.3672 1.8012-3.6133 3.8086-6.7383 6.0222l-3.7109 2.6367c-2.3221 1.6493-3.9117 2.8429-4.7689 3.5807s-1.5788 1.5951-2.1647 2.5716h20.6054v8.1706h-32.3242c.0868-3.3854.8138-6.4779 2.181-9.2774z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default TwoTrain;
