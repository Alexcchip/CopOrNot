import * as React from "react";
import Svg, { Circle, G, Path } from "react-native-svg";
const NJTransit = ({width = 50, height = 50, ...props}) => (
  <Svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    viewBox="0 0 90 90"
    xmlns="http://www.w3.org/2000/svg"
    width = {width}
    height = {height}
    {...props}
  >
    <Circle cx={45} cy={45} fill="#0078c6" r={45} />
    <G fill="#fff" fillRule="nonzero">
      <Path d="m15.369 52.053c.217 1.559.641 2.725 1.274 3.497 1.158 1.405 3.142 2.107 5.952 2.107 1.683 0 3.049-.185 4.099-.556 1.992-.71 2.988-2.03 2.988-3.96 0-1.127-.494-1.999-1.482-2.617-.989-.602-2.54-1.135-4.655-1.598l-3.613-.81c-3.551-.803-6.006-1.676-7.365-2.617-2.3-1.575-3.45-4.038-3.45-7.388 0-3.057 1.111-5.597 3.334-7.619 2.224-2.023 5.489-3.034 9.797-3.034 3.597 0 6.666.953 9.205 2.86 2.54 1.907 3.872 4.674 3.995 8.302h-6.855c-.123-2.053-1.019-3.512-2.686-4.377-1.112-.571-2.494-.857-4.146-.857-1.837 0-3.304.371-4.4 1.112s-1.644 1.776-1.644 3.103c0 1.22.54 2.131 1.621 2.733.695.402 2.177.872 4.447 1.413l5.882 1.413c2.578.617 4.524 1.443 5.836 2.478 2.038 1.605 3.057 3.929 3.057 6.97 0 3.119-1.193 5.709-3.578 7.77s-5.755 3.092-10.109 3.092c-4.447 0-7.944-1.015-10.491-3.045-2.548-2.031-3.821-4.821-3.821-8.372h6.808z" />
      <Path d="m40.159 28.454h7.087v34.137h-7.087z" />
      <Path d="m59.9 34.382v9.171h8.083c1.605 0 2.81-.185 3.612-.556 1.421-.648 2.131-1.93 2.131-3.844 0-2.069-.687-3.458-2.061-4.169-.772-.401-1.93-.602-3.474-.602zm15.297-5.048c1.289.54 2.381 1.335 3.277 2.385.741.865 1.327 1.822 1.76 2.872.432 1.05.648 2.246.648 3.589 0 1.621-.409 3.216-1.227 4.783-.819 1.567-2.169 2.675-4.053 3.323 1.575.633 2.69 1.532 3.346 2.698.657 1.166.985 2.945.985 5.338v2.293c0 1.559.061 2.617.185 3.173.185.88.618 1.528 1.297 1.945v.857h-7.851c-.216-.757-.371-1.366-.463-1.83-.186-.957-.286-1.937-.301-2.941l-.047-3.173c-.031-2.177-.428-3.628-1.192-4.353-.765-.726-2.197-1.089-4.296-1.089h-7.365v13.386h-6.971v-34.136h16.744c2.393.046 4.234.339 5.524.88z" />
    </G>
  </Svg>
);
export default NJTransit;
