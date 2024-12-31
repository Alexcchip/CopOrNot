import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const QTrain = ({width = 50, height = 50, ...props}) => (
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
    <Circle cx={45} cy={45} fill="#fccc0a" r={45} />
    <Path
      d="m48.597 61.4063c.5859-.152 1.3346-.4232 2.2461-.8139l-4.8503-4.6223 5.1758-5.4037 4.8503 4.6224c.7595-1.5625 1.2912-2.9297 1.595-4.1016.4775-1.7578.7162-3.8086.7162-6.1523 0-5.3819-1.1014-9.5432-3.3041-12.4837-2.2026-2.9406-5.4199-4.4108-9.6517-4.4108-3.9713 0-7.1397 1.4106-9.5052 4.2317-2.3654 2.8212-3.5481 7.0421-3.5481 12.6628 0 6.5755 1.6927 11.2847 5.0781 14.1276 2.1918 1.8446 4.8177 2.7669 7.8776 2.7669 1.1502 0 2.2569-.141 3.3203-.4231zm18.1966-6.4454c-.8463 2.7561-2.0942 5.0456-3.7435 6.8685l5.5339 5.1758-5.2409 5.4688-5.7943-5.4688c-1.7578 1.0634-3.2769 1.8121-4.5573 2.2461-2.1484.7161-4.72 1.0742-7.7148 1.0742-6.25 0-11.4149-1.8663-15.4948-5.5989-4.9479-4.4922-7.4219-11.0894-7.4219-19.7917 0-8.7674 2.5391-15.3971 7.6172-19.8893 4.145-3.6676 9.2991-5.5013 15.4623-5.5013 6.2066 0 11.4149 1.9422 15.625 5.8268 4.8611 4.4922 7.2916 10.7747 7.2916 18.8477 0 4.2751-.5208 7.8559-1.5625 10.7421z"
      fillRule="nonzero"
    />
  </Svg>
);
export default QTrain;