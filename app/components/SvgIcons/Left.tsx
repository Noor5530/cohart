import React from "react";

import Svg, { Path } from "react-native-svg";
import { iconTypes } from "./types";
export const Left = (props: iconTypes) => {
  const { color = "black", height = "14", width = "14" } = props;
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
        d="M6.64474 0.583984L0.433134 6.79559L0.167969 7.06076L0.433134 7.32592L6.64474 13.5375L7.17507 13.0072L1.71141 7.54354L13.3379 7.54354V6.79354L1.49585 6.79354L7.17507 1.11431L6.64474 0.583984Z"
        fill={color}
      />
    </Svg>
  );
};

export default Left;
