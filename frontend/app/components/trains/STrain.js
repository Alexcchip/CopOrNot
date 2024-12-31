import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const STrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#808183" r={45} />
    <Path
      d="m35.1042 54.1797c.3038 2.1918.9006 3.8303 1.7903 4.9154 1.6276 1.9748 4.4163 2.9622 8.3659 2.9622 2.3655 0 4.286-.2604 5.7617-.7813 2.7995-.9982 4.1993-2.8537 4.1993-5.5664 0-1.5842-.6945-2.8103-2.0834-3.6783-1.3889-.8464-3.5699-1.5951-6.5429-2.2461l-5.0782-1.1394c-4.9913-1.1284-8.4418-2.3546-10.3515-3.6784-3.2335-2.2135-4.8503-5.6749-4.8503-10.3841 0-4.2968 1.5625-7.8667 4.6875-10.7096s7.7148-4.2643 13.7695-4.2643c5.0565 0 9.3696 1.34 12.9395 4.0202 3.5699 2.6801 5.4416 6.5701 5.6152 11.6699h-9.6354c-.1736-2.8863-1.4323-4.9371-3.776-6.1524-1.5625-.8029-3.5048-1.2044-5.8269-1.2044-2.5824 0-4.6441.5208-6.1849 1.5625s-2.3112 2.4957-2.3112 4.362c0 1.7144.7596 2.9948 2.2787 3.8411.9766.5643 3.0599 1.2262 6.25 1.9857l8.2682 1.9857c3.6242.868 6.3585 2.0291 8.2031 3.4831 2.8646 2.2569 4.2969 5.523 4.2969 9.7981 0 4.3837-1.6764 8.0241-5.0293 10.9213-3.3528 2.8971-8.0892 4.3457-14.209 4.3457-6.25 0-11.1653-1.4269-14.7461-4.2806-3.5807-2.8538-5.371-6.7763-5.371-11.7676z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default STrain;
