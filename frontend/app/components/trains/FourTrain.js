import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const FourTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#00933b" r={45} />
    <Path
      d="m61.3249 58.8346h-5.3386v10.1563h-9.082v-10.1563h-18.6849v-8.1054l17.3503-28.6459h10.4166v29.4922h5.3386zm-14.4206-7.2591v-20.3776l-11.8164 20.3776z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default FourTrain;
