import React from "react";

import Svg, { Circle } from "react-native-svg";
import { iconTypes } from "./types";
export const Dots = (props: iconTypes) => {
  const { height = "19", width = "19", color = "black" } = props;
  return (
    <Svg
      width={height}
      height={width}
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Circle
        cx="9.5"
        cy="3.5"
        r="1.5"
        transform="rotate(90 9.5 3.5)"
        fill={color}
      />
      <Circle
        cx="9.5"
        cy="9.5"
        r="1.5"
        transform="rotate(90 9.5 9.5)"
        fill={color}
      />
      <Circle
        cx="9.5"
        cy="15.5"
        r="1.5"
        transform="rotate(90 9.5 15.5)"
        fill={color}
      />
    </Svg>
  );
};

export default Dots;
