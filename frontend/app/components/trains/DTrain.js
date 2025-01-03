import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const DTrain = ({width = 50, height = 50, ...props}) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={1.41421}
    viewBox="0 0 90 90"
    xmlns="http://www.w3.org/2000/svg"
    width= {width}
    height = {height}
    {...props}
  >
    <Circle cx={45} cy={45} fill="#ff6219" r={45} />
    <Path
      d="m35.7389 29.3424v31.3152h9.2448c4.7309 0 8.0295-2.3329 9.8959-6.9987 1.0199-2.5608 1.5299-5.6099 1.5299-9.1472 0-4.8828-.765-8.6317-2.2949-11.2467-1.53-2.615-4.5736-3.9226-9.1309-3.9226zm18.3594-7.2916c3.3637 1.1068 6.0872 3.1358 8.1706 6.0872 1.671 2.3872 2.8103 4.9696 3.4179 7.7474.6077 2.7778.9115 5.4254.9115 7.9427 0 6.3802-1.2804 11.7839-3.8411 16.211-3.4723 5.9678-8.8325 8.9518-16.0808 8.9518h-20.6705v-47.9818h20.6705c2.9731.0434 5.4471.3906 7.4219 1.0417z"
      fill="#fff"
      fillRule="nonzero"
    />
  </Svg>
);
export default DTrain;
