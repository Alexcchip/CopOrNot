import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const GTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#6dbe45" r={45} />
    <Path
      d="m56.4095 35.9831c-.7595-3.2769-2.615-5.5664-5.5664-6.8685-1.6493-.7162-3.4831-1.0742-5.5013-1.0742-3.8629 0-7.0367 1.4594-9.5215 4.3782-2.4848 2.9189-3.7272 7.308-3.7272 13.1673 0 5.9028 1.3455 10.0803 4.0365 12.5326 2.6909 2.4522 5.7508 3.6784 9.1796 3.6784 3.3638 0 6.1198-.9712 8.2683-2.9134 2.1484-1.9423 3.4722-4.4868 3.9713-7.6335h-11.1002v-8.0078h19.9869v25.7487h-6.6406l-1.0091-5.9896c-1.9314 2.2786-3.6675 3.8846-5.2083 4.8177-2.6476 1.6276-5.9028 2.4414-9.7657 2.4414-6.3585 0-11.5668-2.2027-15.625-6.6081-4.2317-4.427-6.3476-10.4817-6.3476-18.164 0-7.7691 2.1376-13.9974 6.4128-18.6849 4.2751-4.6875 9.9283-7.0313 16.9596-7.0313 6.0981 0 10.9972 1.5463 14.6973 4.6387 3.7 3.0925 5.8214 6.9499 6.3639 11.5723z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default GTrain;