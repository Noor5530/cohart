import React from "react";

import Svg, { Path } from "react-native-svg";
import { iconTypes } from "./types";
export const RightIcon = (props: iconTypes) => {
  const { height = "60%", width = "14%", color = "black" } = props;
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.97677 0.523437L0.765165 6.73504L0.5 7.00021L0.765165 7.26537L6.97677 13.477L7.5071 12.9467L2.04344 7.48299L13.6699 7.48299V6.73299L1.82788 6.73299L7.5071 1.05377L6.97677 0.523437Z"
        fill={color}
      />
    </Svg>
  );
};

export default RightIcon;
